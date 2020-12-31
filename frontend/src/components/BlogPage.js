import React from "react";
import { Container, Row } from "react-bootstrap";

import { TopNav } from "./TopNav";
import { Footer } from "./Footer";
import { SideBar } from "./SideBar";
import { PostPageCardContainer } from "./PostPageCardContainer";

class BlogPage extends React.Component {
  render() {
    return (
      <div>
        <TopNav/>
        <Container>
          <Row>
            <PostPageCardContainer {...this.props}/>
            <SideBar/>
         </Row>
        </Container>
        <Footer/>
      </div>
    );
  }
}

export { BlogPage };

