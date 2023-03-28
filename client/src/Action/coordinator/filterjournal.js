import axios from "axios";
const filterJournal = async (user,authorKey,authorValue,yearKey,yearValue) => {
    try{
        let res;
        if(authorValue == "" && yearValue == "") {
          res = await axios.post(`http://localhost:5000/info/getjournal`,user);
        } else {
            let filterQuery = "";
            if(authorValue != ""){
              filterQuery += `${authorKey}=${authorValue}`;
            }
            if(yearValue != "") {
              if(filterQuery != "") filterQuery += "&";
              filterQuery += `${yearKey}=${yearValue}`;
            }
            res = await axios.post(`http://localhost:5000/info/getjournal?${filterQuery}`,user);
        }
        return {
            type:"data",
            filterdata: res.data.data
        }
    }catch(error){
        return {
            type: "error",
            error: error[0]
        }
    }
  };

  function matchesSearchQuery(item, searchQuery) {
    const srNo = item.props.children[0].props.children?.toLowerCase();
    const academicYear = item.props.children[1].props.children?.toLowerCase();
    const submitingAuthor = item.props.children[2].props.children?.toLowerCase();
    const title = item.props.children[3].props.children?.toLowerCase();
    const firstAuthor = item.props.children[4].props.children?.toLowerCase();
    const doi = item.props.children[5].props.children?.toLowerCase();
    const journaltitle = item.props.children[6].props.children?.toLowerCase();
    const journalpublisher = item.props.children[7].props.children?.toLowerCase();
    const issnprint = item.props.children[8].props.children?.toLowerCase();
  
    return (
      (srNo && srNo.includes(searchQuery.toLowerCase())) ||
      (academicYear && academicYear.includes(searchQuery.toLowerCase())) ||
      (firstAuthor && firstAuthor.includes(searchQuery.toLowerCase())) ||
      (title && title.includes(searchQuery.toLowerCase())) ||
      (submitingAuthor && submitingAuthor.includes(searchQuery.toLowerCase())) ||
      (journalpublisher && journalpublisher.includes(searchQuery.toLowerCase())) ||
      (journaltitle && journaltitle.includes(searchQuery.toLowerCase())) ||         
      (issnprint && issnprint.includes(searchQuery.toLowerCase())) ||
      (doi && doi.includes(searchQuery?.toLowerCase()))
    );
  }
  
  function filterListItems(listItems, searchQuery) {
    return listItems.filter(item => matchesSearchQuery(item, searchQuery));
  }
  
  export {filterJournal,filterListItems}