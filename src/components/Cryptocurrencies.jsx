import React, { useState, useEffect } from 'react'
import millify from 'millify'
import { Link } from 'react-router-dom'
import { Card, Row, Col, Input} from 'antd'

import { useGetCryptosQuery } from '../services/cryptoApi'

const Cryptocurrencies = ({simplified}) => {

    const [ cryptos, setCryptos ] = useState([]);
    const [ searchTerm, setSearchTerm] = useState('');


    // pass this count to useGetCryptosQuery
    const count = simplified ? 10 : 100 ;


    // for calling objects we use curly braces
    // let cryptoList = {}
    const { data : cryptosList, isFetching } = useGetCryptosQuery(count);

    useEffect(() => {
        // setCryptos(cryptosList?.data?.coins);

        const filteredData = cryptosList?.data?.coins.filter((coin) => coin.name.toLowerCase().includes(searchTerm.toLowerCase()))

        setCryptos(filteredData);
    }, [cryptosList, searchTerm])


    // useEffect(() => {
    //     console.log('something changed cryptolist = ', cryptosList);
    //     cryptosList !== undefined && setCryptos(cryptosList.data.coins)
    // }, [cryptosList])


    // for calling states we use square braces
    // const [ cryptos, setCryptos ] = useState(cryptosList?.data?.coins);


    console.log(cryptos);

    if(isFetching) {
        console.log('The value of fetching is', cryptosList )
        return 'Loading...'
    }
          
    // cryptos !== undefined && cryptos !== [] && 

    return (
        // This is called a React Fragment
        <>
            {!simplified && (
                <div className='search-crypto'>
                <Input placeholder="Search Cryptocurrency" onChange={(e)=> setSearchTerm(e.target.value)} />
                </div>
            )}
            <Row gutter={[32,32]} className="crypto-card-container">
                {cryptos?.map((currency) => (
                    <Col xs={24} sm={12} lg={6} className="crypto-card" key={currency.id}>
                        <Link to={`/crypto/${currency.id}`}>
                            <Card 
                                title={`${currency.rank}. ${currency.name}`}
                                extra={<img className='crypto-image' src={currency.iconUrl} />}
                                hoverable
                            >
                                <p>Price: {millify(currency.price)}</p>
                                <p>Market Cap: {millify(currency.marketCap)}</p>
                                <p>Daily Change: {millify(currency.change)}%</p>
                            </Card>
                        </Link>
                    </Col>
                ))}
            </Row>
        </>
    )
}

export default Cryptocurrencies


// how wide it is going to be on xs devices
// 24 means it would take entire width
// since we are also looking over something 
// we need key