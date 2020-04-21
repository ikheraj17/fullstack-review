import React from 'react';

const RepoList = ({repos}) => (
  <div>
    <h4> Repo List Component </h4>
    <div>{repos[0]}</div>
    <div>{repos[1]}</div>
    <div>There are {repos.length} repos.</div>
  </div>
)


export default RepoList;