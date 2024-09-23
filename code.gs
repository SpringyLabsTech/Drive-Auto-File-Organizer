function moveFiles() {
    const rootFolder = DriveApp.getRootFolder();
    const folders = {
      'Test': DriveApp.getFolderById('Folder-ID-Here'), // Replace with actual folder ID
    
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
  