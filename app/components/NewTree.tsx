'use client';

import { useRouter } from 'next/router';
import React, { FC, useEffect, useState } from 'react';
import { useQueryClient } from 'react-query';
import { useTreeMutation } from '../api';

const NewTree: FC<{ hide: () => void }> = ({ hide }) => {
  const [newTree, setNewTree] = useState(true);

  const [streetValue, setStreet] = useState<string>();
  const [maintainerValue, setMaintainer] = useState<string>();
  const [qtyValue, setQty] = useState<number>();
  const [typeValue, setType] = useState<string>('oak');

  const valid = streetValue && maintainerValue && qtyValue && typeValue;

  const [showAlert, setShowAlert] = useState(false);

  const treeMutation = useTreeMutation();
  const queryClient = useQueryClient();

  const submitNewTree = () => {
    if (!valid) {
      setShowAlert(true);
      return;
    }

    treeMutation
      .mutateAsync({
        street: streetValue,
        maintainer: maintainerValue,
        qty: qtyValue,
        type: typeValue,
      })
      .then(() => {
        queryClient.invalidateQueries({ queryKey: ['trees'] });
        // setNewTree(false);
        hide();
        setShowAlert(false);
      });
  };

  useEffect(() => {
    if (!newTree) setShowAlert(false);
  }, [newTree]);

  return (
    <div className="mt-16 space-y-4">
      <h2 className="font-bold scroll-my-8" id="new-tree">
        New tree
      </h2>
      {!newTree && (
        <a href="#new-tree" onClick={() => setNewTree(true)} className="btn">
          Create new tree
        </a>
      )}

      {newTree && (
        <div>
          <div>
            <div className="space-y-2">
              <div>
                <span className="text-gray-700">Street:</span>
                <input
                  value={streetValue}
                  onChange={(evt) => setStreet(evt.target.value)}
                  type="text"
                  className="block w-full mt-1 form-input"
                />
              </div>
              <div>
                <span className="text-gray-700">Maintainer:</span>
                <input
                  value={maintainerValue}
                  onChange={(evt) => setMaintainer(evt.target.value)}
                  type="text"
                  className="block w-full mt-1 form-input"
                />
              </div>
              <div>
                <span className="text-gray-700">Quantity:</span>
                <input
                  value={qtyValue}
                  onChange={(evt) => setQty(Number(evt.target.value))}
                  type="number"
                  className="block w-full mt-1 form-input"
                />
              </div>
              <div>
                <span className="text-gray-700">Type:</span>
                <select
                  value={typeValue}
                  onChange={(evt) => setType(evt.target.value)}
                  className="block w-full mt-1 form-input"
                >
                  <option id="oak">oak</option>
                  <option id="maple">maple</option>
                  <option id="mulberry">mulberry</option>
                  <option id="pine">pine</option>
                  <option id="christmas tree 🎄">christmas tree 🎄</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      )}
      {newTree && !valid && showAlert && (
        <div className="alert alert-red">
          Some form fields are missing a value
        </div>
      )}
      {newTree && (
        <div className="flex space-x-2">
          <a
            href="#"
            className="btn btn-outline"
            onClick={() => {
              hide();
              setShowAlert(false);
            }}
          >
            Cancel
          </a>
          <a
            href={valid ? '#' : undefined}
            className="btn"
            onClick={() => submitNewTree()}
          >
            Confirm
          </a>
        </div>
      )}
      {newTree && <div className="h-screen"></div>}
    </div>
  );
};

export default NewTree;
