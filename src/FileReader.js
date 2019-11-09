import React, { Component } from 'react'

class FileInput extends React.Component {
    constructor(props) {
        super(props)
        this.uploadFile = this.uploadFile.bind(this);
    }

    uploadFile(event) {
        let selectedFile = event.target.files;
        let file = null;
        let fileName = "";
        //Check File is not Empty
        if (selectedFile.length > 0) {
            // Select the very first file from list
            let fileToLoad = selectedFile[0];
            fileName = fileToLoad.name;
            // FileReader function for read the file.
            let fileReader = new FileReader();
            // Onload of file read the file content
            fileReader.onload = function (fileLoadedEvent) {
                file = fileLoadedEvent.target.result;
                // Print data in console
                console.log(file);
            };
            // Convert data to base64
            fileReader.readAsDataURL(fileToLoad);
        }
        console.log(file)
        console.log(fileName)
    }

    readTextFile = file => {
        var rawFile = new XMLHttpRequest();
        rawFile.open("GET", file, false);
        rawFile.onreadystatechange = () => {
            if (rawFile.readyState === 4) {
                if (rawFile.status === 200 || rawFile.status == 0) {
                    var allText = rawFile.responseText;
                    console.log(rawFile)
                    this.setState({
                        text: allText
                    });
                }
            }
        };
        rawFile.send(null);
    };



    render() {
        return <span>
            < input type="file" name="myFile"
                onChange={
                    this.uploadFile
                }
            /> 
            </span>
    }
    
}
export default FileInput