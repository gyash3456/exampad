import React from "react";
import Logo from "../../images/logo.png";
import LogoDark from "../../images/logo-dark.png";
import PageContainer from "../../layout/page-container/PageContainer";
import { Block, BlockContent } from "../../components/Component";
import { Spinner } from "reactstrap";

const Loader = () => {
  return (
    <React.Fragment>
      <PageContainer>
        <Block className="nk-block-middle nk-auth-body d-flex justify-content-around">
          <div className="brand-logo pb-5">
            <a className="logo-link">
              <img className="logo-light logo-img logo-img-lg" src={Logo} alt="logo" />
              <img className="logo-dark logo-img logo-img-lg" src={LogoDark} alt="logo-dark" />
            </a>
          </div>
          <div className="brand-logo pb-5">
            <Spinner />
          </div>
        </Block>
      </PageContainer>
    </React.Fragment>
  );
};
export default Loader;
