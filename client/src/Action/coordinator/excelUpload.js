import * as xlsx from "xlsx";

// const excelFileToJSON =  (file) => {
//     try {
//       const reader = new FileReader();
//       reader.readAsBinaryString(file);
//       var temp = reader.onload = (e) => {
//         const data = e.target.result;
//         const workbook = xlsx.read(data, { type: "binary" });
//         var result = {};

//         workbook.SheetNames.forEach(function (sheetName) {
//           var roa = xlsx.utils.sheet_to_row_object_array(
//             workbook.Sheets[sheetName]
//           );
//           if (roa.length > 0) {
//             result[sheetName] = roa;
//           }
//         });
//         console.log(result);
//         //setJsonData(result);
//         return {
//             type:"data",
//             exceldata: result
//         }
//       };
//       console.log(temp);
//     } catch (error) {
//       console.log(error);
//       return {
//         type: "error",
//         error: error[0]
//     }
//     }
//   };

const excelFileToJSON = (file) => {
  return new Promise((resolve, reject) => {
    try {
      const reader = new FileReader();
      reader.readAsBinaryString(file);
      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = xlsx.read(data, { type: "binary" });
        var result = {};

        workbook.SheetNames.forEach(function (sheetName) {
          var roa = xlsx.utils.sheet_to_row_object_array(
            workbook.Sheets[sheetName]
          );
          if (roa.length > 0) {
            result[sheetName] = roa;
          }
        });
        console.log(result);
        resolve({
          type:"data",
          exceldata: result
        });
      };
    } catch (error) {
      console.log(error);
      reject({
        type: "error",
        error: error[0]
      });
    }
  });
};

  const readUploadFile = async (files) => {
    console.log(files)
    if (files.length === 0) {
      alert("Please choose any file...");
      return;
    }
    var filename = files[0].name;
    var extension = filename.substring(filename.lastIndexOf(".")).toUpperCase();
    if (extension === ".XLS" || extension === ".XLSX") {
      // console.log(files[0]);
      return excelFileToJSON(files[0]);
    } else {
            return {
            type: "error",
            message:"Please select a valid excel file."
        }
    }
  };

  export {readUploadFile}