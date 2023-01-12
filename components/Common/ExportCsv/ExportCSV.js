import { CSVLink } from "react-csv";
const ExportCSV = (props) => {
  const fileHeaders = props.fileHeaders ? props.fileHeaders : [];
  const data = props.data ? props.data : [];
  const filename = props.filename ? props.filename : "results.csv";

  return (
    <div>
      <CSVLink
        headers={fileHeaders}
        data={data}
        filename={filename}
        target="_blank"
      >
        {props.edit}
      </CSVLink>
    </div>
  );
};
export default ExportCSV;
