import React, { useState } from 'react'

import UnitName from '../CustomFunction/UnitName'
import UnitValue from '../CustomFunction/UnitValue'
import AppUrl from '../ProductRestApi/AppUrl'
import RestCLient from '../ProductRestApi/RestCLient'

export default function Update({
  selectedRow,
  dataReload,
  submitTitle,
  setShowModal,
}) {
  const initialState = {
    productName: selectedRow[0].product_name,
    productQuantity:selectedRow[0].input_unit_value,
    productInputUnitPrice: selectedRow[0].input_unit_price,
    productInputUnit: selectedRow[0].input_unit,
    productOutPutUnit: selectedRow[0].output_unit,
  }


  const [updateData,setUpdateData]=useState(initialState)

  const onChangeHandler = ({target:{name,value}})=>{
    if (name === 'productInputUnit' || name === 'productOutPutUnit') {
      setUpdateData({ ...updateData, [name]: UnitValue(value) })
    } else {
      setUpdateData({ ...updateData, [name]: UnitValue(value) })
    }

  }
  const [difKey, setDifKey] = useState(0)
  let {
    productName,
    productQuantity,
    productInputUnit,
    productInputUnitPrice,
    productOutPutUnit,
  } = updateData

  const updateProduct = () => { 
    if (
      !productName ||
      !productQuantity ||
      productQuantity < 0 ||
      !productInputUnit ||
      !productInputUnitPrice ||
      !productOutPutUnit
    )
      return

    RestCLient.updateData(
      AppUrl.ProductUpdateData + selectedRow[0].id,
      JSON.stringify(updateData),
    )
      .then((res) => {
        setDifKey(Math.random())
        dataReload((res) => !res)
        setShowModal((prev)=>!prev)
        return console.log(res.message)
      })
      .catch((error) => console.log(error))

      setUpdateData(initialState)
  }
  return (
    <div key={difKey}>
      <div className="flex flex-col mb-5">
        <form className="w-full">
          <div className=" flex flex-wrap space-x-2">
            <fieldset className="input_secondary">
              <legend>Select Product:</legend>
              <select
                id='"form-subscribe-Filter'
                className="input_primary"
                placeholder="name"
                value={productName}
                name="productName"
                onChange={onChangeHandler}
              >
                <option value="DEFAULT" disabled hidden>
                  Product
                </option>
                <option value="Rice">Rice</option>
                <option value="Sugar">Sugar</option>
                <option value="Salt">Salt</option>
                <option value="Onion">Onion</option>
              </select>
            </fieldset>
            <fieldset className="input_secondary">
              <legend>Enter Quantity:</legend>
              <input
                type="number"
                id='"form-subscribe-Filter'
                className="input_primary"
                placeholder="Quantity"
                value={productQuantity}
                name="productQuantity"
                onChange={onChangeHandler}

              />
            </fieldset>
            <fieldset className="input_secondary">
              <legend>Enter Unit Price:</legend>
              <input
                type="number"
                id='"form-subscribe-Filter'
                className="input_primary"
                placeholder="Unit Price"
                value={productInputUnitPrice}
                name="productInputUnitPrice"
                onChange={onChangeHandler}

              />
            </fieldset>
            <fieldset className="input_secondary">
              <legend>Enter Buying Unit:</legend>
              <select
                id='"form-subscribe-Filter'
                className="input_primary"
                placeholder="name"
                value={UnitName(productInputUnit)}
                name="productInputUnit"
                onChange={onChangeHandler}

              >
                <option value="DEFAULT" disabled hidden>
                  Unit
                </option>
                <option value="gram">Gram</option>
                <option value="kg">Kg</option>
                <option value="packet">Packet(5kg)</option>
                <option value="bag">Bag(25kg)</option>
                <option value="sack">Sack(40kg)</option>
                <option value="ton">Ton(100kg)</option>
              </select>
            </fieldset>
            <fieldset className="input_secondary">
              <legend>Enter Store Unit:</legend>
              <select
                id='"form-subscribe-Filter'
                className="input_primary"
                placeholder="name"
                value={UnitName(productOutPutUnit)}
                name="productOutPutUnit"
                onChange={onChangeHandler}

              >
                <option value="DEFAULT" disabled hidden>
                  Unit
                </option>
                <option value="gram">Gram</option>
                <option value="kg">Kg</option>
                <option value="packet">Packet(5kg)</option>
                <option value="bag">Bag(25kg)</option>
                <option value="sack">Sack(40kg)</option>
                <option value="ton">Ton(100kg)</option>
              </select>
            </fieldset>
          </div>
        </form>
        <div className="flex gap-4">
          <button
            className="button_primary"
            type="submit"
            onClick={updateProduct}
          >
            {submitTitle}
          </button>
        </div>
      </div>
    </div>
  )
}
