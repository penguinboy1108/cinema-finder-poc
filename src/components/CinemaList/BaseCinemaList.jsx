import { List, Divider, ListSubheader } from "@mui/material";
import CinemaListItem from "./CinemaListItem";

const CinemaListAside = ({ cinemas, Header = null }) => {
  return (
    <List
      sx={{
        maxHeight: "calc(100vh - 112px)",
        overflowY: "auto",
      }}
      subheader={
        Header && (
          <ListSubheader
            sx={{
              position: "sticky",
              top: 0,
              backgroundColor: "background.paper", // 避免透明
              zIndex: 1,
            }}
          >
            <Header cinemas={cinemas} />
            <Divider />
          </ListSubheader>
        )
      }
    >
      {/* 渲染影院列表 */}
      {cinemas.map((cinema, idx) => (
        <CinemaListItem {...cinema} key={idx} />
      ))}
    </List>
  );
};
export default CinemaListAside;
