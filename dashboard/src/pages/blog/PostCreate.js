import React, { useState } from "react";
import Content from "../../layout/content/Content";
import Head from "../../layout/head/Head";
import { Row, Col, FormGroup } from "reactstrap";
import { Editor } from "@tinymce/tinymce-react";

import { Block, BlockHead, BlockHeadContent, BlockTitle, PreviewCard, Button } from "../../components/Component";

function PostCreate() {
  const [content, setContent] = useState("");
  return (
    <React.Fragment>
      <Head title="Blog" />
      <Content page="component">
        <Block size="lg">
          <BlockHead>
            <BlockHeadContent>
              <BlockTitle tag="h5">Blog</BlockTitle>
            </BlockHeadContent>
          </BlockHead>
          <PreviewCard>
            <div className="card-head">
              <h5 className="card-title">Create New Post</h5>
            </div>
            <form>
              <Row className="g-4">
                <Col lg="12">
                  <FormGroup className="form-group">
                    <label className="form-label" htmlFor="title">
                      Title
                    </label>
                    <div className="form-control-wrap">
                      <input type="text" id="title" className="form-control" />
                    </div>
                  </FormGroup>
                </Col>
                <Col lg="12">
                  <FormGroup className="form-group">
                    <label className="form-label" htmlFor="content">
                      Content
                    </label>
                    <div className="form-control-wrap">
                      <Editor
                        initialValue="<p>This is the initial content of the editor.</p>"
                        value={content}
                        onEditorChange={(newContent, editor) => setContent(newContent)}
                        init={{
                          menubar: "file edit view format",
                          plugins: [
                            "advlist autolink lists link image charmap print preview anchor",
                            "searchreplace visualblocks code fullscreen",
                            "insertdatetime media table paste code",
                          ],
                          toolbar:
                            "undo redo | formatselect | " +
                            "bold italic | alignleft aligncenter " +
                            "alignright alignjustify | outdent indent",
                        }}
                      />{" "}
                    </div>
                  </FormGroup>
                </Col>

                <Col xl="12">
                  <Button color="primary" size="lg">
                    Save
                  </Button>
                </Col>
              </Row>
            </form>
          </PreviewCard>
        </Block>
      </Content>
    </React.Fragment>
  );
}

export default PostCreate;
