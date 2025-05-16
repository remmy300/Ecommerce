import { Outlet } from "react-router-dom";
import Header from "../Component/Header";
import Footer from "../Component/Footer";
import PropTypes from "prop-types";

const Layout = ({ onSearchQuery, searchQuery, onCategorySelect }) => {
  return (
    <div>
      <Header
        onSearchQuery={onSearchQuery}
        searchQuery={searchQuery}
        onCategorySelect={onCategorySelect}
      />
      <main className="min-h-screen">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;

Layout.propTypes = {
  onCategorySelect: PropTypes.func.isRequired,
  onSearchQuery: PropTypes.func.isRequired,
  searchQuery: PropTypes.string.isRequired,
};
