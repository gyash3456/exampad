import React, { Suspense, useLayoutEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { ProductContextProvider } from "../pages/pre-built/products/ProductContext";
import { UserContextProvider } from "../pages/pre-built/user-manage/UserContext";
import { RedirectAs404 } from "../utils/Utils";

import Homepage from "../pages/Homepage";

import Component from "../pages/components/Index";
import Accordian from "../pages/components/Accordions";
import Alerts from "../pages/components/Alerts";
import Avatar from "../pages/components/Avatar";
import Badges from "../pages/components/Badges";
import Breadcrumbs from "../pages/components/Breadcrumbs";
import ButtonGroup from "../pages/components/ButtonGroup";
import Buttons from "../pages/components/Buttons";
import Cards from "../pages/components/Cards";
import Carousel from "../pages/components/Carousel";
import Dropdowns from "../pages/components/Dropdowns";
import FormElements from "../pages/components/forms/FormElements";
import FormLayouts from "../pages/components/forms/FormLayouts";
import FormValidation from "../pages/components/forms/FormValidation";
import DataTablePage from "../pages/components/table/DataTable";
import Modals from "../pages/components/Modals";
import Pagination from "../pages/components/Pagination";
import Popovers from "../pages/components/Popovers";
import Progress from "../pages/components/Progress";
import Spinner from "../pages/components/Spinner";
import Tabs from "../pages/components/Tabs";
import Toast from "../pages/components/Toast";
import Tooltips from "../pages/components/Tooltips";
import Typography from "../pages/components/Typography";
import CheckboxRadio from "../pages/components/forms/CheckboxRadio";
import AdvancedControls from "../pages/components/forms/AdvancedControls";
import InputGroup from "../pages/components/forms/InputGroup";
import FormUpload from "../pages/components/forms/FormUpload";
import NumberSpinner from "../pages/components/forms/NumberSpinner";
import NouiSlider from "../pages/components/forms/nouislider";
import WizardForm from "../pages/components/forms/WizardForm";
import UtilBorder from "../pages/components/UtilBorder";
import UtilColors from "../pages/components/UtilColors";
import UtilDisplay from "../pages/components/UtilDisplay";
import UtilEmbeded from "../pages/components/UtilEmbeded";
import UtilFlex from "../pages/components/UtilFlex";
import UtilOthers from "../pages/components/UtilOthers";
import UtilSizing from "../pages/components/UtilSizing";
import UtilSpacing from "../pages/components/UtilSpacing";
import UtilText from "../pages/components/UtilText";

import Blank from "../pages/others/Blank";
import Faq from "../pages/others/Faq";
import Regularv1 from "../pages/others/Regular-1";
import Regularv2 from "../pages/others/Regular-2";
import Terms from "../pages/others/Terms";
import BasicTable from "../pages/components/table/BasicTable";
import SpecialTablePage from "../pages/components/table/SpecialTable";
import ChartPage from "../pages/components/charts/Charts";
import EmailTemplate from "../pages/components/email-template/Email";
import NioIconPage from "../pages/components/crafted-icons/NioIcon";
import SVGIconPage from "../pages/components/crafted-icons/SvgIcons";

import ProjectCardPage from "../pages/pre-built/projects/ProjectCard";
import ProjectListPage from "../pages/pre-built/projects/ProjectList";
import UserListRegularPage from "../pages/pre-built/user-manage/UserListRegular";
import UserContactCardPage from "../pages/pre-built/user-manage/UserContactCard";
import UserDetailsPage from "../pages/pre-built/user-manage/UserDetailsRegular";
import UserListCompact from "../pages/pre-built/user-manage/UserListCompact";
import UserProfileLayout from "../pages/pre-built/user-manage/UserProfileLayout";
import KycListRegular from "../pages/pre-built/kyc-list-regular/KycListRegular";
import KycDetailsRegular from "../pages/pre-built/kyc-list-regular/kycDetailsRegular";
import TransListBasic from "../pages/pre-built/trans-list/TransListBasic";
import TransListCrypto from "../pages/pre-built/trans-list/TransListCrypto";
import ProductCard from "../pages/pre-built/products/ProductCard";
import ProductList from "../pages/pre-built/products/ProductList";
import ProductDetails from "../pages/pre-built/products/ProductDetails";
import InvoiceList from "../pages/pre-built/invoice/InvoiceList";
import InvoiceDetails from "../pages/pre-built/invoice/InvoiceDetails";
import PricingTable from "../pages/pre-built/pricing-table/PricingTable";
import GalleryPreview from "../pages/pre-built/gallery/GalleryCardPreview";
import ReactToastify from "../pages/components/misc/ReactToastify";

import AppMessages from "../pages/app/messages/Messages";
import Chat from "../pages/app/chat/ChatContainer";
import Calender from "../pages/app/calender/Calender";
import FileManager from "../pages/app/file-manager/FileManager";
import Inbox from "../pages/app/inbox/Inbox";
import Kanban from "../pages/app/kanban/Kanban";
import DateTimePicker from "../pages/components/forms/DateTimePicker";
import CardWidgets from "../pages/components/widgets/CardWidgets";
import ChartWidgets from "../pages/components/widgets/ChartWidgets";
import RatingWidgets from "../pages/components/widgets/RatingWidgets";
import SlickPage from "../pages/components/misc/Slick";
import SweetAlertPage from "../pages/components/misc/SweetAlert";
import BeautifulDnd from "../pages/components/misc/BeautifulDnd";
import DualListPage from "../pages/components/misc/DualListbox";
import GoogleMapPage from "../pages/components/misc/GoogleMap";
import JsTreePreview from "../pages/components/misc/JsTree";
import QuillPreview from "../pages/components/forms/rich-editor/QuillPreview";
import TinymcePreview from "../pages/components/forms/rich-editor/TinymcePreview";
import KnobPreview from "../pages/components/charts/KnobPreview";
import { FileManagerContextProvider } from "../pages/app/file-manager/FileManagerContext";

import Users from "../pages/user/Users";
import PostCreate from "../pages/blog/PostCreate";

const Pages = () => {
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  });
  return (
    <Suspense fallback={<div />}>
      <Routes>
        {/*Pre-built Pages*/}
        <Route exact path={`/posts`} element={<ProjectCardPage />} />
        <Route exact path={`/new-post`} element={<PostCreate />} />
        <Route
          exact
          path={`/users`}
          element={
            <UserContextProvider>
              <Users />{" "}
            </UserContextProvider>
          }
        />
        <Route
          exact
          path={`/user-list-compact`}
          render={() => (
            <UserContextProvider>
              <UserListCompact />
            </UserContextProvider>
          )}
        ></Route>
        <Route //Context Api added
          exact
          path={`/user-details-regular/:id`}
          render={(props) => (
            <UserContextProvider>
              <UserDetailsPage {...props} />
            </UserContextProvider>
          )}
        ></Route>
        <Route exact path={`/user-profile-regular/`} element={<UserProfileLayout />} />
        <Route exact path={`/user-profile-notification/`} element={<UserProfileLayout />} />
        <Route exact path={`/user-profile-activity/`} element={<UserProfileLayout />} />
        <Route exact path={`/user-profile-setting/`} element={<UserProfileLayout />} />
        <Route //Context api added
          exact
          path={`/user-contact-card`}
          render={() => (
            <UserContextProvider>
              <UserContactCardPage />
            </UserContextProvider>
          )}
        ></Route>
        <Route exact path={`/kyc-list-regular`} element={<KycListRegular />} />
        <Route exact path={`/kyc-details-regular/:id`} element={<KycDetailsRegular />} />
        <Route exact path={`/transaction-basic`} element={<TransListBasic />} />
        <Route exact path={`/transaction-crypto`} element={<TransListCrypto />} />
        <Route exact path={`/product-list`} element={<ProductList />} />

        <Route // context api added
          exact
          path={`/product-card`}
          render={(props) => (
            <ProductContextProvider>
              <ProductCard />
            </ProductContextProvider>
          )}
        ></Route>
        <Route
          exact
          path={`/product-details/:id`}
          render={(props) => (
            <ProductContextProvider>
              <ProductDetails {...props} />
            </ProductContextProvider>
          )}
        ></Route>
        <Route exact path={`/invoice-list`} element={<InvoiceList />} />
        <Route exact path={`/invoice-details/:id`} element={<InvoiceDetails />} />
        <Route exact path={`/pricing-table`} element={<PricingTable />} />
        <Route exact path={`/image-gallery`} element={<GalleryPreview />} />

        {/*Demo Pages*/}
        <Route exact path={`/pages/terms-policy`} element={<Terms />} />
        <Route exact path={`/pages/faq`} element={<Faq />} />
        <Route exact path={`/pages/regular-v1`} element={<Regularv1 />} />
        <Route exact path={`/pages/regular-v2`} element={<Regularv2 />} />

        {/*Application*/}
        <Route exact path={`/app-messages`} element={<AppMessages />} />
        <Route exact path={`/app-chat`} element={<Chat />} />
        <Route exact path={`/app-calender`} element={<Calender />} />
        <Route
          exact
          path={`/app-file-manager`}
          render={(props) => (
            <FileManagerContextProvider>
              <FileManager />
            </FileManagerContextProvider>
          )}
        ></Route>
        <Route
          exact
          path={`/app-file-manager/files`}
          render={(props) => (
            <FileManagerContextProvider>
              <FileManager />
            </FileManagerContextProvider>
          )}
        ></Route>
        <Route
          exact
          path={`/app-file-manager/shared`}
          render={(props) => (
            <FileManagerContextProvider>
              <FileManager />
            </FileManagerContextProvider>
          )}
        ></Route>
        <Route
          exact
          path={`/app-file-manager/starred`}
          render={(props) => (
            <FileManagerContextProvider>
              <FileManager />
            </FileManagerContextProvider>
          )}
        ></Route>
        <Route
          exact
          path={`/app-file-manager/recovery`}
          render={(props) => (
            <FileManagerContextProvider>
              <FileManager />
            </FileManagerContextProvider>
          )}
        ></Route>
        <Route
          exact
          path={`/app-file-manager/settings`}
          render={(props) => (
            <FileManagerContextProvider>
              <FileManager />
            </FileManagerContextProvider>
          )}
        ></Route>
        <Route
          exact
          path={`/app-file-manager/pricing`}
          render={(props) => (
            <FileManagerContextProvider>
              <FileManager />
            </FileManagerContextProvider>
          )}
        ></Route>
        <Route
          exact
          path={`/app-file-manager/folder/:id`}
          render={(props) => (
            <FileManagerContextProvider>
              <FileManager />
            </FileManagerContextProvider>
          )}
        ></Route>
        <Route exact path={`/app-inbox`} element={<Inbox />} />
        <Route exact path={`/app-kanban`} element={<Kanban />} />

        {/*elements*/}
        <Route exact path={`/components`} element={<Component />} />
        <Route exact path={`/components/accordions`} element={<Accordian />} />
        <Route exact path={`/components/alerts`} element={<Alerts />} />
        <Route exact path={`/components/avatar`} element={<Avatar />} />
        <Route exact path={`/components/badges`} element={<Badges />} />
        <Route exact path={`/components/breadcrumbs`} element={<Breadcrumbs />} />
        <Route exact path={`/components/button-group`} element={<ButtonGroup />} />
        <Route exact path={`/components/buttons`} element={<Buttons />} />
        <Route exact path={`/components/cards`} element={<Cards />} />
        <Route exact path={`/components/carousel`} element={<Carousel />} />
        <Route exact path={`/components/dropdowns`} element={<Dropdowns />} />
        <Route exact path={`/components/form-elements`} element={<FormElements />} />
        <Route exact path={`/components/form-layouts`} element={<FormLayouts />} />
        <Route exact path={`/components/checkbox-radio`} element={<CheckboxRadio />} />
        <Route exact path={`/components/advanced-control`} element={<AdvancedControls />} />
        <Route exact path={`/components/input-group`} element={<InputGroup />} />
        <Route exact path={`/components/form-upload`} element={<FormUpload />} />
        <Route exact path={`/components/number-spinner`} element={<NumberSpinner />} />
        <Route exact path={`/components/form-validation`} element={<FormValidation />} />
        <Route exact path={`/components/datetime-picker`} element={<DateTimePicker />} />
        <Route exact path={`/components/modals`} element={<Modals />} />
        <Route exact path={`/components/pagination`} element={<Pagination />} />
        <Route exact path={`/components/popovers`} element={<Popovers />} />
        <Route exact path={`/components/progress`} element={<Progress />} />
        <Route exact path={`/components/spinner`} element={<Spinner />} />
        <Route exact path={`/components/tabs`} element={<Tabs />} />
        <Route exact path={`/components/toast`} element={<Toast />} />
        <Route exact path={`/components/tooltips`} element={<Tooltips />} />
        <Route exact path={`/components/typography`} element={<Typography />} />
        <Route path={`/components/noUislider`} element={<NouiSlider />} />
        <Route exact path={`/components/wizard-basic`} element={<WizardForm />} />
        <Route exact path={`/components/quill`} element={<QuillPreview />} />
        <Route exact path={`/components/tinymce`} element={<TinymcePreview />} />
        <Route exact path={`/components/widgets/cards`} element={<CardWidgets />} />
        <Route exact path={`/components/widgets/charts`} element={<ChartWidgets />} />
        <Route path={`/components/widgets/rating`} element={<RatingWidgets />} />
        <Route exact path={`/components/misc/slick-slider`} element={<SlickPage />} />
        <Route exact path={`/components/misc/sweet-alert`} element={<SweetAlertPage />} />
        <Route exact path={`/components/misc/beautiful-dnd`} element={<BeautifulDnd />} />
        <Route exact path={`/components/misc/dual-list`} element={<DualListPage />} />
        <Route exact path={`/components/misc/map`} element={<GoogleMapPage />} />
        <Route exact path={`/components/misc/toastify`} element={<ReactToastify />} />
        <Route exact path={`/components/misc/jsTree`} element={<JsTreePreview />} />
        <Route exact path={`/components/util-border`} element={<UtilBorder />} />
        <Route exact path={`/components/util-colors`} element={<UtilColors />} />
        <Route exact path={`/components/util-display`} element={<UtilDisplay />} />
        <Route exact path={`/components/util-embeded`} element={<UtilEmbeded />} />
        <Route exact path={`/components/util-flex`} element={<UtilFlex />} />
        <Route exact path={`/components/util-others`} element={<UtilOthers />} />
        <Route exact path={`/components/util-sizing`} element={<UtilSizing />} />
        <Route exact path={`/components/util-spacing`} element={<UtilSpacing />} />
        <Route exact path={`/components/util-text`} element={<UtilText />} />
        <Route exact path={`/table-basic`} element={<BasicTable />} />
        <Route exact path={`/table-datatable`} element={<DataTablePage />} />
        <Route exact path={`/table-special`} element={<SpecialTablePage />} />
        <Route exact path={`/charts/chartjs`} element={<ChartPage />} />
        <Route exact path={`/charts/knobs`} element={<KnobPreview />} />
        <Route exact path={`/email-template`} element={<EmailTemplate />} />
        <Route exact path={`/nioicon`} element={<NioIconPage />} />
        <Route exact path={`/svg-icons`} element={<SVGIconPage />} />
        <Route exact path={`/`} element={<Homepage />} />
        <Route element={RedirectAs404}></Route>
      </Routes>
    </Suspense>
  );
};
export default Pages;
