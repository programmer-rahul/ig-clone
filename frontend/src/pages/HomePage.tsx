import Topbar from "../components/homepage/Topbar";
import SuggestedUsers from "../components/homepage/SuggestedUsers";
import AllPostsContainer from "../components/homepage/AllPostsContainer";
import SideNavBar from "../components/homepage/SideNavBar";

const HomePage = () => {
  return (
    <main>
      <div className="h-screen bg-stone-950 flex justify-between flex-col md:flex-row-reverse lg:flex-row">
        {/* topbar  */}
        <Topbar />

        {/* all posts  */}
        <AllPostsContainer />

        {/* suggested-users */}
        <SuggestedUsers />

        {/* sidebar  */}
        <SideNavBar />
      </div>
    </main>
  );
};
export default HomePage;
