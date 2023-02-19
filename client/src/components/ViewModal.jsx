import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import "../styles/ViewModal.css";

const ViewModal = (props) => {
  const data = props.data;
  const list = Object.entries(data).map(([key, value]) => {
    if (key !== "_id" && key !== "__v")
      return (
        <p>
          <span className="key">{key} : </span>{" "}
          <span className="value"> {value} </span>
        </p>
      );
  });
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {data.Title_of_Research_Paper}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="data-row">{list}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};
export default ViewModal;

{
  /*         <p><span className="key">Sr_No : </span> <span className="value"> {data.Sr_No} </span></p>
            <p><span className="key">Academic_Year : </span> <span className="value"> {data.Academic_Year} </span></p>
            <p><span className="key">Data_Submitting_Author_department : </span> <span className="value"> {data.Data_Submitting_Author_department} </span></p>
            <p><span className="key">Data_Submitting_Author_name : </span> <span className="value"> {data.Data_Submitting_Author_name} </span></p>
            <p><span className="key">First_Author_name : </span> <span className="value"> {data.First_Author_name} </span></p>
            <p><span className="key">First_Author_department : </span> <span className="value"> {data.First_Author_department} </span></p>
            <p><span className="key">First_Author_organization : </span> <span className="value"> {data.First_Author_organization} </span></p>
            <p><span className="key">Names_of_Other_Author_From_DDU : </span> <span className="value"> {data.Names_of_Other_Author_From_DDU} </span></p>
            <p><span className="key">Names_of_Other_Author_From_other_Organization : </span> <span className="value"> {data.Names_of_Other_Author_From_other_Organization} </span></p>
            <p><span className="key">Title_of_Research_Paper : </span> <span className="value"> {data.Title_of_Research_Paper} </span></p>
            <p><span className="key">Publication_Level : </span> <span className="value"> {data.Publication_Level} </span></p>
            <p><span className="key">Journal_title : </span> <span className="value"> {data.Journal_title} </span></p>
            <p><span className="key">Journal_publisher : </span> <span className="value"> {data.Journal_publisher} </span></p>
            <p><span className="key">Link : </span> <span className="value"> {data.Link} </span></p>
            <p><span className="key">Publication_Date_DD_MM_YYYY : </span> <span className="value"> {data.Publication_Date_DD_MM_YYYY} </span></p>
            <p><span className="key">Month_Number : </span> <span className="value"> {data.Month_Number} </span></p>
            <p><span className="key">Year : </span> <span className="value"> {data.Year} </span></p>
            <p><span className="key">Volume : </span> <span className="value"> {data.Volume} </span></p>
            <p><span className="key">Number : </span> <span className="value"> {data.Number} </span></p>
            <p><span className="key">Pages_xx_yy : </span> <span className="value"> {data.Pages_xx_yy} </span></p>
            <p><span className="key">DOI : </span> <span className="value"> {data.DOI} </span></p>
            <p><span className="key">ISSN_Print : </span> <span className="value"> {data.ISSN_Print} </span></p>
            <p><span className="key">ISSN_Online : </span> <span className="value"> {data.ISSN_Online} </span></p>
            <p><span className="key">Impact_Factor_Value : </span> <span className="value"> {data.Impact_Factor_Value} </span></p>
            <p><span className="key">Impact_Factor_Year : </span> <span className="value"> {data.Impact_Factor_Year} </span></p>
            <p><span className="key">Impact_Factor_Agency : </span> <span className="value"> {data.Impact_Factor_Agency} </span></p>  */
}
