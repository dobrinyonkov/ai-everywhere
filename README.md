# Chrome Extension: AI everywhere Assistant

## Description
AI everywhere Assistant is a Chrome extension designed to provide an AI-powered assistant for various tasks such as question answering and providing predictions. This extension integrates with Ollama and the ai-everywhere-server projects to provide its functionality.

## Demo
![Demo](https://raw.githubusercontent.com/dobrinyonkov/ai-everywhere/main/images/demo.png)

## How to Run Locally
To run the AI everywhere Assistant Chrome extension locally, follow these steps:

### Prerequisites
- Node.js installed on your system.
- Ollama project and [`ai-everywhere-server`](https://github.com/dobrinyonkov/ai-everywhere-server) project cloned and running locally.

### Installation Steps
1. Clone the AI everywhere Assistant repository to your local machine.
2. Navigate to the project directory.
3. Install dependencies using npm:
    ```
    npm install
    ```

### Running Locally
1. Start the Ollama project and ai-everywhere-server project locally according to their respective README instructions.
2. Start the AI everywhere Assistant Chrome extension by running the following command in the project directory:
    ```
    npm start
    ```
3. Once the extension is running, you can open Google Chrome and load the extension by navigating to `chrome://extensions`, enabling Developer mode, and selecting "Load unpacked". Choose the `dist` directory within the AI everywhere Assistant project directory.
4. The extension will now be available in your Chrome browser. You can interact with it by selecting text and using the Magic Key (\`) to invoke the assistant.

## Features
- Allows users to select text and invoke the assistant using the Magic Key (\`).
- Provides AI-powered responses for questions and prompts.
- Integrates with Ollama and ai-everywhere-server projects.

## Dependencies
- React: JavaScript library for building user interfaces.
- react-hooks: Custom hooks for managing state and logic.
- @types/react: TypeScript type definitions for React.
- chrome-extension-libs: Library for building Chrome extensions.
- Other dependencies as specified in the `package.json` file.

## Usage
Once the extension is installed and running locally, users can select text on any webpage and press the Magic Key (\`) to invoke the assistant. The assistant will provide AI-generated responses based on the selected text and user prompts.

## Configuration
- The extension can be configured by modifying the source code files according to specific requirements or preferences.

## License
This project is licensed under the [MIT License](LICENSE).

## Issues
If you encounter any issues or have suggestions for improvements, please open an issue on the [GitHub repository](https://github.com/your/repository).

---