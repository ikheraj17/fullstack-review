import React from 'react';

const RepoList = ({repos}) => (
  <div>
    <h4> Repo List Component </h4>
    <div>{repos}</div>
    <div>There are {repos.length} repos.</div>
  </div>
)

export default RepoList;