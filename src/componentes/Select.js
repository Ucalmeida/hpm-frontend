import P from 'prop-types';

const Select = ({um, dois}) => {
    return <select className={"form-group col-lg-4"} onChange={um}>
        <option value={dois}></option>
    </select>
};

Select.propTypes = {
    um: P.func,
    dois: P.number,
}

export default Select;