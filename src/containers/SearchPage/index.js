import React,{PropTypes} from 'react';
import {Icon} from 'react-fa';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { browserHistory } from 'react-router';
import PageList from '../../components/pageList';
import * as searchActions from '../../actions/searchActions';
import * as cardActions from '../../actions/cardActions';
import SearchRText from '../../components/searchRText';
import SearchRImage from '../../components/searchRImage';
import './index.scss';

class SearchPage extends React.Component {

  componentWillMount(){
    let {query, page} = this.props.params;
    this.props.searchActions.inputSearch({query:query.toUpperCase()});
    page = page ? page : 1;
    this.handlePageList(parseInt(page));
  }
  handlePageList(page){
    let {searchActions} = this.props;
    searchActions.changePage(page);
    searchActions.requestSearch();
  }
  changeMode(mode){
    this.props.searchActions.changeSearchMode(mode);
  }
  render(){
    const { search, cardActions} = this.props;
    return (
      <div className="search-page">
        <h1>搜尋：{search.query}</h1>
        <div className="board">
          <div className="sort">
            排列方式：
            <Icon className={search.display_mode=== 0 ? 'active' :''} onMouseOver={()=>this.changeMode(0)} name="picture-o"/>
            <Icon className={search.display_mode=== 1 ? 'active' :''}  onMouseOver={()=>this.changeMode(1)} name="th-list"/>
          </div>
          <PageList
            query={search.query}
            current={search.current_page}
            totalPage={search.total_page}
            totalCount={search.total_count}
            showCount={5}
            onClick={(page)=>this.handlePageList(page)}/>
          <div className="clear"></div>
            {(() => {
          switch (search.display_mode) {
            case 0:   return <SearchRImage data={search.items} actions={cardActions}/>;
            case 1:   return <SearchRText data={search.items}/>;
          }
            })()}
            <PageList
              query={search.query}
              current={search.current_page}
              totalPage={search.total_page}
              totalCount={search.total_count}
              showCount={5}
              onClick={(page)=>this.handlePageList(page)}/>

        </div>
        <div className="other">
          other
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    search: state.search,
    nav: browserHistory
  };
}

function mapDispatchToProps(dispatch) {
  return {
    searchActions: bindActionCreators(searchActions, dispatch),
    cardActions: bindActionCreators(cardActions, dispatch)

  };
}

SearchPage.propTypes = {
  params: PropTypes.object.isRequired,
  searchActions: PropTypes.object.isRequired,
  cardActions: PropTypes.object.isRequired,
  search: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchPage);
