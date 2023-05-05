const express = require("express");
const {JournalDataModel} = require("../../models/journal");

exports.editjournal = async (req, res) => {
    console.log("edit");
    console.log(req.body);
    // const journalData = {
    //     Sr_No: data?.Sr_No,
    //     Academic_Year: data?.Academic_Year,
    //     Data_Submitting_Author_department:
    //       data?.Data_Submitting_Author_department,
    //     Data_Submitting_Author_name: data?.Data_Submitting_Author_name,
    //     First_Author_name: data?.First_Author_name,
    //     First_Author_department: data?.First_Author_department,
    //     First_Author_organization: data?.First_Author_organization,
    //     Names_of_Other_Author_From_DDU: data?.Names_of_Other_Author_From_DDU,
    //     Names_of_Other_Author_From_other_Organization:
    //       data?.Names_of_Other_Author_From_other_Organization,
    //     Title_of_Research_Paper: data?.Title_of_Research_Paper,
    //     Publication_Level: data?.Publication_Level,
    //     Journal_title: data?.Journal_title,
    //     Journal_publisher: data?.Journal_publisher,
    //     Link: data?.Link,
    //     Publication_Date_DD_MM_YYYY: data?.Publication_Date_DD_MM_YYYY,
    //     Month_Number: data?.Month_Number,
    //     Year: data?.Year,
    //     Volume: data?.Volume,
    //     Number: data?.Number,
    //     Pages_xx_yy: data?.Pages_xx_yy,
    //     DOI: data?.DOI,
    //     ISSN_Print: data?.ISSN_Print,
    //     ISSN_Online: data?.ISSN_Online,
    //     Impact_Factor_Value: data?.Impact_Factor_Value,
    //     Impact_Factor_Year: data?.Impact_Factor_Year,
    //     Impact_Factor_Agency: data?.Impact_Factor_Agency,
    //   };
    const resm = await JournalDataModel.updateMany({ Sr_No: req.body.Sr_No }, req.body);
    // const tem = await JournalDataModel.findOne({Sr_No:req.body.Sr_No});
    // console.log(tem);
    return res.status(200).send({
        message: "Edited Data Succefully",
    })
}
