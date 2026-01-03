# 🧠 AI Tutor System Architecture

This document outlines the architecture of the **Hybrid AI Tutor** implemented in the LMS. The system is designed to prioritize fast, offline responses while falling back to a cloud-based LLM (ChatGPT) for complex queries.

## 🏗️ System Overview

The AI Tutor operates on a **Client-Side First** architecture. This means the decision logic happens directly in the user's browser, ensuring privacy, speed, and reliability even with poor internet connectivity.

```mermaid
flowchart TD
    %% Nodes
    User([🙋 Student])
    
    subgraph Frontend ["🖥️ React Client (Browser)"]
        UI[User Interface]
        SpeechRecog[🎤 Speech Recognition]
        SpeechSynth[🔈 Speech Synthesis]
        
        subgraph Brain ["🧠 Logic Core"]
            Router{Decision Engine}
            RegexEng[Math & Logic Solver]
        end
        
        OfflineDB[(📚 Offline Knowledge Base)]
    end
    
    subgraph Cloud ["☁️ Cloud Services"]
        OpenAI[🤖 OpenAI API (ChatGPT)]
    end

    %% Flows
    User -- "Asks Question (Voice)" --> SpeechRecog
    SpeechRecog -- "Transcribed Text" --> UI
    User -- "Asks Question (Text)" --> UI
    
    UI --> Router
    
    %% Strategy 1: Math/Logic
    Router -- "Is Math? (e.g. 5+5)" --> RegexEng
    RegexEng -- "Calculated Answer" --> SpeechSynth
    
    %% Strategy 2: Offline Lookup
    Router -- "Keyword Match?" --> OfflineDB
    OfflineDB -- "Found Response" --> SpeechSynth
    
    %% Strategy 3: Online Fallback
    Router -- "No Local Match" --> OpenAI
    OpenAI -- "Generated Explanation" --> SpeechSynth
    
    %% Output
    SpeechSynth -- "Spoken Response" --> User
    SpeechSynth -.-> UI
```

---

## 🧩 Component Breakdown

### 1. **User Interface Layer (React)**
- **Role:** Handles user interaction.
- **Components:** Chat bubble display, Microphone toggle, Subject selector.
- **State Management:** Manages chat history, loading states, and voice settings.

### 2. **Decision Engine ("The Router")**
The core logic inside `AITutorPage.tsx` determines how to answer:
1.  **Input Analysis:** It scans the user's text.
2.  **Priority Check:**
    *   **Tier 1 (Math):** Detects numbers and operators (e.g., "Add 5 + 3"). Solves locally.
    *   **Tier 2 (Offline Keywords):** Searches the local `fallbackResponses` JSON object for matches (e.g., "Brain", "Gandhi").
    *   **Tier 3 (Online):** If no local match is found, it calls the OpenAI API.

### 3. **Offline Knowledge Base**
- **Format:** A structured JSON object embedded in the code.
- **Content:** Pre-written, high-quality "Teacher Persona" explanations for core curriculum topics.
- **Benefit:** Zero latency, works without internet, 100% consistent answers.

### 4. **Speech Services (Web APIs)**
- **Recognition (Input):** Uses `window.SpeechRecognition` to convert voice to text.
- **Synthesis (Output):** Uses `window.speechSynthesis` to read answers aloud.
    - *Optimization:* We added custom logic to strip Markdown (`**`) and Emojis (`🤖`) before speaking to ensure natural pronunciation.
    - *Voice Selection:* Prioritizes "Google US English" or "Microsoft Zira" for a professional tutor tone.

### 5. **External LLM (OpenAI)**
- **Role:** Fallback generator.
- **Prompt Engineering:** We use a strict system prompt ("You are a Human-like Explainer...") to ensure even generated answers match the friendly, non-robotic persona of the offline content.
