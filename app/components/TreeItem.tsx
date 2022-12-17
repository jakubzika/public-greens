import { FC, useState } from 'react';
import { useTreeDeleteMutation, useTreeMutation } from '../api';
import { Tree } from '../types';

const TreeItem: FC<Tree> = ({ _id, maintainer, qty, street, type }) => {
  const [isEdited, setIsEdited] = useState(false);

  const [streetValue, setStreet] = useState<string>(street);
  const [maintainerValue, setMaintainer] = useState<string>(maintainer);
  const [qtyValue, setQty] = useState<number>(qty);
  const [typeValue, setType] = useState<string>(type);

  const editTreeMutation = useTreeMutation();
  const deleteTreeMutation = useTreeDeleteMutation();

  const onEdit = () => {
    if (!isEdited) {
      setIsEdited(!isEdited);
      return;
    }
    editTreeMutation.mutateAsync({
      _id,
      maintainer: maintainerValue,
      qty: qtyValue,
      street: streetValue,
      type: typeValue,
    });
    setIsEdited(false);
  };

  const onDelete = () => {
    deleteTreeMutation.mutateAsync(_id!!);
  };

  return (
    <div key={_id} className="my-4 space-y-4 card">
      <div className="flex justify-between align-middle">
        {!isEdited && (
          <div className="space-y-2">
            <div>
              Street:
              <span className="font-medium"> {street}</span>
            </div>
            <div>
              Maintainer:
              <span className="font-medium"> {maintainer}</span>
            </div>
            <div>
              Quantity:
              <span className="font-medium"> {qty}</span>
            </div>
            <div>
              Tree type:
              <span className="font-medium"> {type}</span>
            </div>
          </div>
        )}
        {isEdited && (
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
                <option value="christmas tree 🎄">christmas tree 🎄</option>
                <option value="oak">oak</option>
                <option value="maple">maple</option>
                <option value="mulberry">mulberry</option>
                <option value="pine">pine</option>
              </select>
            </div>
          </div>
        )}
        <div className="flex flex-col justify-between">
          <button className="btn" onClick={onEdit}>
            {isEdited ? 'Apply' : 'Edit'}
          </button>
          {!isEdited && (
            <button className="btn btn-outline" onClick={onDelete}>
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TreeItem;
