# ChatGPT Lingo Live

ChatGPT Lingo Live is a real-time chat message display application designed for language learners. It fetches and displays messages from a ChatGPT conversation, with a focus on Chinese language learning.

## Features

- Real-time message updates every 5 seconds
- Display of Chinese text with Pinyin
- Customizable API token and chat ID
- Responsive design with a modern UI

## How It Works

The application uses React and TypeScript to create a dynamic user interface. Here's an overview of its main functionalities:

1. **Message Fetching**: The app fetches messages from a specified ChatGPT conversation using an API token and chat ID.

2. **Chinese Language Support**: When Chinese characters are detected, the app displays both the original text and its Pinyin representation.

3. **Auto-refresh**: Messages are automatically refreshed every 5 seconds, with a countdown timer displayed.

4. **Manual Refresh**: Users can manually refresh messages using the "Refresh Now" button.

5. **Settings**: Users can input their API token and chat ID through a settings panel. These are stored in local storage for convenience.

## Getting Your API Token and Chat ID

To use ChatGPT Lingo Live, you'll need to obtain your API token and chat ID. Here's how to get them:

### API Token

1. Go to https://chat.openai.com/ and log in to your account.
2. Open your browser's developer tools (usually by pressing F12 or right-clicking and selecting "Inspect").
3. Go to the "Network" tab in the developer tools.
4. Refresh the page or make a new request in ChatGPT.
5. Look for a  XHR request to "conversation" in the Network tab.
6. Click on this request and find the "Request Headers" section.
7. Look for the "Authorization" header. The value after "Bearer" is your API token.

### Chat ID

1. Start or open a conversation in ChatGPT.
2. Look at the URL in your browser's address bar.
3. The chat ID is the long string of characters after "https://chat.openai.com/c/".

For example, if the URL is "https://chat.openai.com/c/680aa16c-2c90-8010-9f4f-632fa6163836", then "680aa16c-2c90-8010-9f4f-632fa6163836" is your chat ID.

Remember to keep your API token secure and never share it publicly. You can now use these credentials in the app's settings to start fetching your chat messages.



6. **Stop Functionality**: Users can stop the auto-refresh timer if needed.

## Setup and Usage

1. Clone the repository
2. Install dependencies with `npm install`
3. Run the development server with `npm run dev`
4. Open the application in your browser
5. Click on "Settings" to input your API token and chat ID
6. Save the settings and watch as messages start appearing

## Dependencies

- React
- Axios for API requests
- Pinyin for Chinese character transliteration
- TypeScript for type safety

## Note

This application requires a valid ChatGPT API token and chat ID to function. Make sure you have the necessary permissions and credentials before using.

## Contributing

Contributions, issues, and feature requests are welcome. Feel free to check issues page if you want to contribute.

## License

[MIT](https://choosealicense.com/licenses/mit/)
