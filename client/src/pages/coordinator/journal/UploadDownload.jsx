import React from "react";

function UploadDownload({ designation, journalData, jsontableData, downloadExcel, UploadFile, uploadData }) {
    return (
        <>
            {designation === "coordinator" && (
                <div className="btns">
                    <div className="download">
                        <div className="template">
                            <button className="btn btn-primary" onClick={() => downloadExcel(journalData, "Journal-Template.xlsx")}>
                                Download Template
                            </button>
                        </div>
                        <div className="template">
                            <button className="btn btn-primary" onClick={() => downloadExcel(jsontableData, "Journal.xlsx")}>
                                Download Records
                            </button>
                        </div>
                    </div>

                    <div className="upload">
                        <span style={{ fontSize: "18px", fontWeight: "600" }}>Files Supported (xls or xlsx) : &nbsp;</span>
                        <input type="file" accept=".xls, .xlsx" id="upload" name="upload" onChange={UploadFile} />
                        <input className="btn btn-primary" type="button" name="submit" value="Upload" onClick={uploadData} />
                    </div>
                </div>
            )}
        </>
    );
}

export default UploadDownload;
