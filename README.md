# Drive Auto File Organizer

This Google Apps Script automatically organizes files in your Google Drive based on their names. It moves files with specific naming conventions to designated folders.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Code Overview](#code-overview)
- [Auto Run](#auto-run)
- [Examples](#examples)
- [Deployment](#deployment)
- [Notes](#notes)
- [License](#license)

## Features

- Automatically moves Google Docs, Sheets, Slides, and Forms to specified folders based on their titles.
- Easily configurable to add more folders and categories.

## Getting Started

### Prerequisites

- A Google account to access Google Drive and Google Apps Script.

### Installation

1. **Open Google Apps Script**: Go to [Google Apps Script](https://script.google.com).
2. **Create a New Project**: Click on "New Project".
3. **Copy the Code**: Use the provided code snippet below.

## Usage

1. **Edit the Code**:
   - Replace placeholder folder names and IDs in the `folders` object with your actual folder names and IDs.
   - The folder ID can be found in the URL of the folder when opened in Google Drive.

 <img width="1128" alt="Folder ID" src="https://github.com/user-attachments/assets/86ac3216-7957-40c9-858c-0475cdae6115">


2. **Set Up Time-Driven Triggers**:
   - Set a trigger to run this function periodically (e.g., every 10 or 15 minutes) to check for new files.

## Code Overview

Here's the complete code for the file mover:

```javascript
function moveFiles() {
  const rootFolder = DriveApp.getRootFolder();
  const folders = {
    'Data 101': DriveApp.getFolderById('Folder ID here'), // Replace with actual folder ID
    'Data 102': DriveApp.getFolderById('Folder ID here'), // Replace with actual folder ID
    'Reports': DriveApp.getFolderById('Folder ID here'), // Replace with actual folder ID
    // Add more folders as needed
  };

  const files = rootFolder.getFiles();
  const movedFiles = [];

  while (files.hasNext()) {
    const file = files.next();
    const title = file.getName();
    const matches = title.match(/\[(.*?)\]/);

    // Check if the file is a supported type
    const mimeType = file.getMimeType();
    const supportedTypes = [
      MimeType.GOOGLE_DOCS,
      MimeType.GOOGLE_SHEETS,
      MimeType.GOOGLE_SLIDES,
      MimeType.GOOGLE_FORMS,
    ];

    if (matches && supportedTypes.includes(mimeType)) {
      const category = matches[1].trim();
      const targetFolder = folders[category];

      if (targetFolder) {
        targetFolder.addFile(file);
        rootFolder.removeFile(file);
        movedFiles.push(file.getName());
      }
    }
  }

  Logger.log('Moved files: ' + movedFiles.join(', '));
}
```

## Examples

### Example Folder Structure

Suppose you have the following folders in your Google Drive:

<img width="1124" alt="Folder Structure" src="https://github.com/user-attachments/assets/2882f77f-315b-4900-8ef3-5d906d79ab3e">

*Example folder structure in Google Drive.*

- **Data 101**
- **Data 102**
- **Reports**

### Example File Naming

When naming your files, use the format:

<img width="1115" alt="Folder Structure" src="https://github.com/user-attachments/assets/4b907d92-19a2-4861-b807-d2c7611ef53d">
*Example of file naming convention.*

- `[Data 101] - Project Proposal`
- `[Data 102] - Budget Report`
- `[Reports] - Quarterly Review`

### Expected Behavior

- When a file named `[Data 101] - Project Proposal` is added to your root folder, the script will automatically move it to the **Data 101** folder.
- Similarly, `[Data 102] - Budget Report` will go to the **Data 102** folder.

## Deployment

1. **Deploy the Script**:
   - Click on **Deploy** in the script editor.
   - Choose **New deployment**.
   - Select **Time-driven triggers** to run the `moveFiles` function at your desired intervals.

*Steps for deploying the script.*

<img width="730" alt="Add trigger" src="https://github.com/user-attachments/assets/19db7573-e99d-4663-b581-3ba6448730f3">


2. **Set Up Triggers**:
   - Click on the clock icon (Triggers).
   - Add a new trigger to run `moveFiles` based on your chosen frequency.
<img width="730" alt="Screenshot 2024-09-23 at 11 33 46 AM" src="https://github.com/user-attachments/assets/210fce95-1754-4b35-8320-6988c44c45d7">

## Auto Run

1. Click the triggers (clock icon).
2. Add a trigger.
3. Select event source: **Time-driven**.
4. Select type of time-based trigger: **Hour timer**.
5. Select hour interval: Change to your liking.
6. Adjust failure notification settings as needed.
<img width="1083" alt="Auto-run" src="https://github.com/user-attachments/assets/a8bfdcf5-89e4-4bbf-b686-d608cc240b9c">

## Notes

- Ensure that the naming convention is consistent for the script to work correctly.
- The script only processes files of the specified types (Docs, Sheets, Slides, Forms).


## License

This project is open-source and free to use. You can modify it as needed for your personal or organizational use.
