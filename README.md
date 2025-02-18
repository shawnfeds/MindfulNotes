# MindfulNotes
MindfulNotes is a simple, user-friendly journaling application that allows you to record your daily entries and save them in a JSON file. With MindfulNotes, you can easily keep track of your thoughts, experiences, and reflections in a structured and organized manner.

## Features
- **Daily Journaling**: Record your daily entries and save them in a JSON file.

- **User-Friendly Interface**: Simple and intuitive interface for easy journaling.

- **Data Security**: Your entries are saved locally in a JSON file for privacy and security.

## Installation
Clone the repository:

```sh
git clone https://github.com/yourusername/mindfulnotes.git
```
Navigate to the project directory:

```sh
cd mindfulnotes
```
Install the required dependencies:

```sh
dotnet restore
```
## Usage
Run the application:

```sh
dotnet run
```
Open your browser and navigate to http://localhost:5000 to access the MindfulNotes interface.

Use the interface to record your daily entries. Your entries will be saved in a JSON file located in the data directory.

## Example Entry
Here is an example of a daily entry saved in the JSON file:

```sh
json
{
    "date": "2025-02-18",
    "entry": "Today was a productive day. I completed my project and went for a long walk in the park."
}
```
## Contributing
Contributions are welcome! If you would like to contribute to MindfulNotes, please follow these steps:

Fork the repository.

**Create a new branch**:

sh
git checkout -b feature/your-feature-name
Make your changes and commit them:

```sh
git commit -m "Add your commit message"
```
Push to the branch:
```sh
git push origin feature/your-feature-name
```
**Create a pull request**.

## License
This project is licensed under the MIT License. See the LICENSE file for more details.
