'use client';

import pluralize from 'pluralize';
import { useState } from 'react';
import { useTrees } from './api';
import NewTree from './components/NewTree';
import TreeItem from './components/TreeItem';

export default function Home() {
  const [streetInput, setStreetInput] = useState<string>();
  const [streetFilter, setStreetFilter] = useState<string | undefined>();

  const [newTree, setNewTree] = useState(false);

  const { data } = useTrees(streetFilter);

  const onFilterSubmit = () => {
    setStreetFilter(streetInput == '' ? undefined : streetInput);
  };

  return (
    <div className="container my-8 lg:w-[50rem] space-y-6">
      <h1 className="font-bold">Public greens 🌲</h1>
      <div className="flex">
        <label className="block">
          <span className="text-gray-700">Street name filter:</span>
          <div className="flex space-x-2">
            <input
              onChange={(evt) => setStreetInput(evt.target.value)}
              type="text"
              className="block w-full mt-1 form-input"
            />
            <button onClick={onFilterSubmit} className="btn">
              Confirm
            </button>
          </div>
        </label>
      </div>
      <div>
        <a href="#new-tree" className="btn" onClick={() => setNewTree(true)}>
          Create new tree
        </a>
      </div>
      <div className="space-y-4">
        <h2 className="font-bold">
          Found {pluralize('tree', data?.length, true)}
        </h2>
        <div>
          <div>
            {data?.length == 0 && <hr />}
            {data && data.map((tree) => <TreeItem key={tree._id} {...tree} />)}
          </div>
        </div>
      </div>
      <div style={{ visibility: newTree ? 'initial' : 'hidden' }}>
        <NewTree hide={() => setNewTree(false)} />
      </div>
    </div>
  );
}
