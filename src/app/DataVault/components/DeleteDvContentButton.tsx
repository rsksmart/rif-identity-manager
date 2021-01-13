import React, { useState } from 'react'
import trashIcon from '../../../assets/images/icons/trash.svg'
import BinaryModal from '../../../components/Modal/BinaryModal'
import { DataVaultContent } from '../../state/reducers/datavault'

interface Interface {
  itemKey: string
  item: DataVaultContent
  deleteValue: (key: string, id: string) => Promise<any>
}

const DeleteDvContentButton: React.FC<Interface> = ({
  itemKey, item, deleteValue
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isError, setIsError] = useState<null | string>(null)
  const [isDeleting, setIsDeleting] = useState<boolean>(false)

  const handleDeleteItem = () => {
    setIsLoading(true)
    setIsError(null)

    deleteValue(itemKey, item.id)
      .then(() => setIsDeleting(false))
      .catch((err: Error) => setIsError(err.message))
      .finally(() => setIsLoading(false))
  }

  return (
    <>
      <button
        disabled={isLoading}
        className="icon delete"
        onClick={() => setIsDeleting(true)}>
        <img src={trashIcon} alt="Delete Item" />
      </button>

      <BinaryModal
        show={isDeleting}
        onClose={() => setIsDeleting(false)}
        onConfirm={() => isDeleting && handleDeleteItem()}
        disabled={isLoading}
        strings={{ text: 'Do you want to delete this item from the data vault?', confirm: 'Yes', deny: 'No' }}
        className="delete-modal"
      />
    </>
  )
}

export default DeleteDvContentButton
