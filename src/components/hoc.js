import React from "react";
import { Redirect } from "react-router-dom";

// const withEither = (
//   conditionalRenderFnct,
//   EitherComponent
// ) => Component => props =>
//   conditionalRenderFnct(props) ? <EitherComponent /> : <Component {...props} />;

// const withMaybe = conditionalRenderFnct => Component => props =>
//   conditionalRenderFnct(props) ? null : <Component {...props} />;

// const isLoadingConditionalFnt = ({ isLoading }) => isLoading;
// const isErrorConditionalFnt = ({ isError }) => isError;

// const LoadingIndicator = () => <div>Loading....</div>;

// const ErrorComponent = withMaybe(isErrorConditionalFnt);
// const LoadingComponent = withEither(isLoadingConditionalFnt, LoadingIndicator);

// export { LoadingComponent, ErrorComponent };

const pageLoaderHOC = Component => {
  return class PageLoader extends React.Component {
    render() {
      if (this.props.isLoading) {
        return <div>Loading....</div>;
      }
      if (this.props.isError) {
        return <Redirect to="/#invalid_token=true" />;
      }

      return <Component {...this.props} />;
    }
  };
};

// const withPageLoader = Component => ({ isLoading, isError, ...others }) =>
//   isLoading ? (
//     <div>Loading....</div>
//   ) : isError ? (
//     <Redirect to="/#invalid_token=true" />
//   ) : (
//     <Component {...others} />
//   );

export default pageLoaderHOC;

/* Page Loader HOC
  -- loader
  -- check null
  -- is empty
  
  --> Load Component
*/
