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

// HOC
// const pageLoaderHOC = Component => {
//   return class PageLoader extends React.Component {
//     render() {
//       if (this.props.isLoading) {
//         return <div>Loading....</div>;
//       }
//       if (this.props.isError) {
//         return <Redirect to="/" />;
//       }

//       return <Component {...this.props} />;
//     }
//   };
// };

const pageLoaderHOC = Component => ({ isLoading, isError, ...others }) => {
  return isLoading ? (
    <div>Loading....</div>
  ) : isError ? (
    <Redirect to="/" />
  ) : (
    <Component {...others} />
  );
};

export default pageLoaderHOC;

// Render Props

class PageLoaderRenderProps extends React.Component {
  render() {
    const { isLoading, isError } = this.props;
    if (isLoading) {
      return <div>Loading....</div>;
    }
    if (isError) {
      return <Redirect to="/" />;
    }
    return this.props.children(this.props);
  }
}

// const PageLoaderRenderProps = props => {
//   const { isLoading, isError, ...others } = props;
//   return props.isLoading ? (
//     <div>Loading....</div>
//   ) : props.isError ? (
//     <Redirect to="/" />
//   ) : (
//     props.children(...others)
//   );
// };

export { PageLoaderRenderProps };

/* Page Loader HOC
  -- loader
  -- check null
  -- is empty
  
  --> Load Component
*/
