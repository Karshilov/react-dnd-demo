import "./App.css";
import "@arco-design/web-react/dist/css/arco.css";
import { Layout, Menu, Message } from "@arco-design/web-react";
import { Container } from "./components/Container";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import DragInput from "./components/DragItem/DragInput";
import { IconBytedanceColor } from "@arco-design/web-react/icon";

const { SubMenu } = Menu;
const MenuItem = Menu.Item;

const { Sider, Content, Header, Footer } = Layout;

const App = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <Layout style={{ background: "rgb(242, 243, 245)" }}>
        <Sider>
          <div
            style={{
              height: "2rem",
              margin: "1rem",
              background: "rgb(242, 243, 245)",
              borderRadius: "0.25rem",
            }}
          ></div>
          <Menu style={{ width: "100%" }} selectable={false} levelIndent={2}>
            <SubMenu
              key="req"
              title={<strong>这里没有什么菜单</strong>}
              selectable={false}
            >
              <MenuItem key="gou">
                <DragInput
                  text="苟利国家生死以"
                  IconPrefix={IconBytedanceColor}
                  sourceProps={{
                    formItemProps: { field: "gou", label: "🐶" },
                    innerProps: { placeholder: "苟" },
                  }}
                />
              </MenuItem>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout>
          <Header
            style={{
              height: "3rem",
              background: "#fff",
              display: "flex",
              alignItems: "center",
              paddingLeft: "1.5rem",
            }}
          >
            假装这里有个Header
          </Header>
          <Content
            style={{ background: "#fff", margin: "3rem", padding: "1.5rem" }}
          >
            <Container />
          </Content>
          <Footer></Footer>
        </Layout>
      </Layout>
    </DndProvider>
  );
};

export default App;
