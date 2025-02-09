import { useEffect, useCallback } from "react";
import { BrowserRouter } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import {
  SetPortfolioData,
  ReloadData,
  Showloading,
  HideLoading,
} from "./redux/rootSlice";

import API from "./api/api";
import Allroutes from "./Allroutes";
import Loader from "./components/Loader";

function App() {
  const dispatch = useDispatch();
  const { portfolioData, reloadData, loading } = useSelector((state) => state.root);
  const User = useSelector((state) => state.currentUser);
  const currentUserId = User?.result?._id;

  const getPortfolioData = useCallback(async () => {
    try {
      dispatch(Showloading());
      const res = await API.get(`/api/get-portfolio-data/${currentUserId}`);
      dispatch(SetPortfolioData(res.data));
      dispatch(ReloadData(false));
      dispatch(HideLoading());
    } catch (error) {
      console.log(error);
      dispatch(HideLoading());
    }
  }, [dispatch, currentUserId]);

  useEffect(() => {
    if (currentUserId && !portfolioData) {
      getPortfolioData();
    }
  }, [currentUserId, portfolioData, getPortfolioData]);

  useEffect(() => {
    if (reloadData) {
      getPortfolioData();
    }
  }, [reloadData, getPortfolioData]);

  return (
    <div>
      <BrowserRouter>
        {loading ? <Loader /> : null}
        <Allroutes />
      </BrowserRouter>
    </div>
  );
}

export default App;
