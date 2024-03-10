const express = require("express")
const {google} = require("googleapis")

const app = express()

app.get("/", async(req, res)=>{
    const auth = new google.auth.GoogleAuth({ 
        keyFile: "credentials.json",
        scopes: "https://www.googleapis.com/auth/spreadsheets"

    })
    const client = await auth.getClient();

    const googleSheets = google.sheets( {version:"v4", auth :client})
     const spreadsheetId= "1pbIZUElUjnHgtwoPUiR36BW25MlrW72goRFtzkLarIw"
    // Get metadata about spreadsheets
    const metaData = await googleSheets.spreadsheets.get({
        auth, 
         spreadsheetId,

    })
    // console.log(metaData.data)
    const getRows = await googleSheets.spreadsheets.values.get({
        auth ,
        spreadsheetId,
        range: "Sheet1"
    })

    // Write rows to spreadsheet

    // await googleSheets.spreadsheets.values.append({
    //     auth ,
    //     spreadsheetId,
    //     range: "Sheet1",
    //     valueInputOption: "USER_ENTERED",
    //     resource: {
    //         values: [
    //             ["YASH KUMAR PATEL","22115165",2]
    //         ]
    //     }
    // })
    editRow()

    res.send(getRows.data)
})


app.listen(8000, (req, res)=>{
    console.log("listening on port 8000")
})

async function editRow() {
    try {
        const auth = new google.auth.GoogleAuth({
            keyFile: 'credentials.json',
            scopes: 'https://www.googleapis.com/auth/spreadsheets'
        });
        const client = await auth.getClient();
        const googleSheets = google.sheets({version: 'v4', auth: client});
        const spreadsheetId = '1pbIZUElUjnHgtwoPUiR36BW25MlrW72goRFtzkLarIw';

        // Step 1: Fetch the data
        const response = await googleSheets.spreadsheets.values.get({
            spreadsheetId: spreadsheetId,
            range: 'Sheet1'  // Adjust sheet name as needed
        });
        const rows = response.data.values;

        // Step 2: Find and edit the row with the desired value in column B
        if (rows) {
            const rowIndex = rows.findIndex(row => row[1] == '22115165'); // Assuming column B is the second element (0-indexed)
            console.log(rowIndex)
            if (rowIndex !== -1) {
                // Update the values in the row
                rows[rowIndex] = ['YASH KUMAR PATEL', '22115165',2]; // Replace 'new_value1', 'new_value2', ... with new values
                // Update the values in the spreadsheet
                const updateResponse = await googleSheets.spreadsheets.values.update({
                    spreadsheetId: spreadsheetId,
                    range: `Sheet1!A${rowIndex + 1}:Z${rowIndex + 1}`, // +1 to convert 0-indexed to 1-indexed
                    valueInputOption: 'RAW',
                    requestBody: {
                        values: [rows[rowIndex]]
                    }
                });
                console.log(`Row ${rowIndex + 1} updated successfully.`);
            } else {
                console.log('Row not found.');
            }
        } else {
            console.log('No data found.');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}


