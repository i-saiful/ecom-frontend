const RadioBox = ({ prices, handleFilters }) => {
    const handleChange = e => {
        handleFilters(e.target.value)
    }
    return prices.map(price => (
        <div key={price.id} className='col-6'>
            <input
                onChange={handleChange}
                value={price.id}
                name='price_filter'
                type='radio'
                className='mr-2' />
            <label className="form-check-label mr-4">{price.name}</label>
        </div>
    ))
}

export default RadioBox