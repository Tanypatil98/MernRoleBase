import React from "react";
import Button from "../Common/Button";

const ListItem = ({ item, i, onClickHandle }) => {
  
  return (
    <tr className="custom_data_table_row" key={i}>
      <td className="custom_data_table_item" style={{ textAlign: "center" }}>
        {item.name}
      </td>
      <td className="custom_data_table_item" style={{ textAlign: "center" }}>
        {item.email}
      </td>
      <td className="custom_data_table_item" style={{ textAlign: "center" }}>
        <Button
          buttonClassName="custom_data_table_button"
          onClick={(e) => onClickHandle(item)}
          text="Delete"
        />
      </td>
    </tr>
  );
};

export default ListItem;
