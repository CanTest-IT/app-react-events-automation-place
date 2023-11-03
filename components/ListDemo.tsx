import classNames from 'classnames';
import nookies from 'nookies';
import { Button } from 'primereact/button';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import { Calendar } from 'primereact/calendar';
import { Checkbox } from 'primereact/checkbox';
import { Rating } from 'primereact/rating';
import { Toast } from 'primereact/toast';
import Head from 'next/head'
import moment from 'moment';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import axios from 'axios'
import TokenService from '../service/TokenService';

const getFilteredEvents = (events, query) => {
    if (!query) return events;
    return events.filter((e) => e.name.toLowerCase().includes(query.toLowerCase().trim()))
}

const ListDemo = () => {

    let emptyProduct = {
        name: '',
        description: '',
        category: null,
        price: 0,
        dateFrom: null,
        dateTo: null,
        image: null
    };
    

    const [eventDialog, setEventDialog] = useState(false);
    const [events, setEvents] = useState([])
    const [event, setEvent] = useState(emptyProduct);
    const [searchText, setSearchText] = useState('')
    const [submitted, setSubmitted] = useState(false);
    const [categories, setCategories] = useState([])
    const [images, setImages] = useState([])
    const [eventToDelete, setEventToDelete] = useState(false)
    const toast = useRef(null);
    const dt = useRef(null);

    const open = (data) => {
        setEvent(data && {
            ...data,
            dateFrom: data.dateFrom && new Date(data.dateFrom),
            dateTo: data.dateTo && new Date(data.dateTo),
            category: categories.find(c => c.code === data.category)
        } || emptyProduct);
        setSubmitted(false);
        setEventDialog(true);
    }

    const hideDialog = () => {
        setSubmitted(false);
        setEventDialog(false);
    }

    const [dataviewValue, setDataviewValue] = useState(null);
    const [layout, setLayout] = useState('grid');
    const [sortKey, setSortKey] = useState(null);
    const [sortOrder, setSortOrder] = useState(null);
    const [sortField, setSortField] = useState(null);


    const fetchEvents = () => {
        fetch('/api/events')
          .then((res) => res.json())
          .then((data) => {
            setEvents(data)
            setDataviewValue(getFilteredEvents(data, searchText))
          })
    }

    useEffect(() => {
        setDataviewValue(getFilteredEvents(events, searchText))
    }, [searchText, events])

    useEffect(() => {
        fetchEvents()
    }, [])

    useEffect(() => {
        const cookies = nookies.get();
        const token = cookies.cantest_token;
        fetch('/api/categories', {
            headers: {
                'Authorization': `Bearer ${token}` // Add the token to the request headers
            }
        })
          .then((res) => {
            if (res.status === 401) TokenService.forceLogout()
            return res.json()
          })
          .then((data) => {
            setCategories(data)
          })
    }, [])

    useEffect(() => {
        fetch('/api/images')
          .then((res) => res.json())
          .then((data) => {
            setImages(data)
          })
    }, [])

    const onInputChange = (e, key) => {
        const value = e.target?.value || e.value || e.checked
        setEvent((previous) => ({
            ...previous,
            [key]: value
        }))
    }

    const deleteEvent = useCallback((data) => {
        axios.delete(`api/events/${data.id}`)
            .then(() => {
                hideDialog()
                toast.current.show({ severity: 'success', summary: 'Success', detail: 'Event deleted', life: 3000 });
                fetchEvents()
                setEventToDelete(false)
            })
    }, [])

    const saveEvent = useCallback(() => {
        setSubmitted(true);
        let promise;
        let error = false
        const keys = ['name','price']
        keys.forEach(key => {
            if (!event[key]) error = true
        })

        if (error) return;

        const body = {
            ...event,
            dateFrom: event.dateFrom && event.dateFrom.toISOString(),
            dateTo: event.dateTo && event.dateTo.toISOString(),
            category: event.category?.code
        }
        if (event.id) {
            promise = axios.put(`/api/events/${event.id}`, body)
        } else {
            promise = axios.post('/api/events', body)
        }
        promise
            .then(() => {
                toast.current.show({ severity: 'success', summary: 'Success', detail: 'Event saved', life: 3000 });
                hideDialog()
                fetchEvents()
            })
            .catch(() => {
                toast.current.show({ severity: 'error', summary: 'Error', detail: 'Problem encountered', life: 3000 });
            })
    }, [event])

    const dataviewHeader = (
        <div className="grid grid-nogutter">
            <div className="col-6" style={{ textAlign: 'left' }}>
                <Button label="New" icon="pi pi-plus" className="p-button-success mr-2" onClick={() => open()} />
            </div>
            <div className="col-6" style={{ textAlign: 'right', flexDirection: 'row', display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                <InputText style={{ marginRight: 8 }} type="search" onInput={(e) => setSearchText(e.target.value)} placeholder="Search..." />
                <DataViewLayoutOptions layout={layout} onChange={(e) => setLayout(e.value)} />
            </div>
        </div>
    );

    const eventDialogFooter = (
        <>
            <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={saveEvent} />
        </>
    );

    const dataviewListItem = (data) => {
        return (
            <div className="col-12">
                <div className="flex flex-column md:flex-row align-items-center p-3 w-full">
                    <img src={`/api/images/${data.image || '0.png'}`} alt={data.name} className="my-4 md:my-0 w-9 md:w-10rem shadow-2 mr-5" />
                    <div className="flex-1 text-center md:text-left">
                        <div className="font-bold text-2xl">{data.name}</div>
                        <div className="mb-3">{data.description}</div>
                        <Rating value={data.rating} readonly cancel={false} className="mb-2"></Rating>
                        <div className="flex align-items-center">
                            <i className="pi pi-tag mr-2"></i>
                            <span className="font-semibold">{data.category}</span>
                        </div>
                        <div style={{ marginTop: 8 }}>
                            <i className="pi pi-calendar mr-2" ></i>
                            <span className="font-semibold">{moment(data.dateFrom).format('D MMMM YY')}</span>
                        </div>
                        <div style={{ marginTop: 8 }}>
                            <i className="pi pi-money-bill mr-2" ></i>
                            <span className="font-semibold">${data.price}</span>
                        </div>
                    </div>
                    <div className="flex flex-row md:flex-column justify-content-between w-full md:w-auto align-items-center md:align-items-end mt-5 md:mt-0">
                        <Button icon="pi pi-user-edit" onClick={() => open(data)} label="" ></Button>
                        <br/>
                        <Button className="p-button-outlined p-button-danger" icon="pi pi-trash" onClick={() => setEventToDelete(data)} label=""></Button>
                    </div>
                </div>
            </div>
        );
    };

    const dataviewGridItem = (data) => {
        return (
            <div className="col-12 md:col-4">
                <div className="card m-3 border-1 surface-border">
                    <div className="flex align-items-center justify-content-between">
                        <div className="flex align-items-center">
                            <i className="pi pi-tag mr-2" />
                            <span className="font-semibold">{data.category}</span>
                        </div>
                        <div>
                            <Button icon="pi pi-user-edit" onClick={() => open(data)} label="" ></Button>
                            &nbsp;
                            <Button className="p-button-outlined p-button-danger" icon="pi pi-trash" onClick={() => setEventToDelete(data)} label=""></Button>
                        </div>
                    </div>
                    <div className="text-center">
                        <img src={`/api/images/${data.image || '0.png'}`} alt={data.name} className="w-9 shadow-2 my-3 mx-0" />
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                                <div style={{ lineBreak: 'anywhere' }} className="text-xl font-bold">{data.name}</div>
                                <Rating value={data.rating} readonly cancel={false} />
                            </div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: 10}}>
                            <div>
                                <i className="pi pi-calendar" style={{marginRight: 3}}></i>
                                <small>{moment(data.dateFrom).format('D MMMM YY')}</small>
                            </div>
                            <div>
                                <i className="pi pi-money-bill" style={{marginRight: 3}}></i>
                                <small>${data.price}</small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const itemTemplate = (data, layout) => {
        if (!data) {
            return;
        }

        if (layout === 'list') {
            return dataviewListItem(data);
        }
        else if (layout === 'grid') {
            return dataviewGridItem(data);
        }
    };

    const confirmationDialogFooter = (
        <>
            <Button type="button" label="No" icon="pi pi-times" onClick={() => setEventToDelete(false)} className="p-button-text" />
            <Button type="button" label="Yes" icon="pi pi-check" onClick={() => deleteEvent(eventToDelete)} className="p-button-text" autoFocus />
        </>
    );

    return (
        <>
        <Head>
            <title>CanTest network</title>
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            <link rel="icon" type="image/x-icon" href="https://static.wixstatic.com/media/d4a01c_579d7aafc6be4be9ac6f31eaacfeef96%7Emv2.png/v1/fill/w_32%2Ch_32%2Clg_1%2Cusm_0.66_1.00_0.01/d4a01c_579d7aafc6be4be9ac6f31eaacfeef96%7Emv2.png"></link>
        </Head>
        <div className="grid list-demo">
            <Toast ref={toast} />
            <Dialog header="Confirmation" visible={eventToDelete} onHide={() => setEventToDelete(false)} style={{ width: '350px' }} modal footer={confirmationDialogFooter}>
                <div className="flex align-items-center justify-content-center">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    <span>Are you sure you want to delete {eventToDelete?.name}?</span>
                </div>
            </Dialog>
            <div className="col-12">
                <div className="card">
                    <h5>Events list</h5>
                    <DataView value={dataviewValue} layout={layout} paginator rows={9} sortOrder={sortOrder} sortField={sortField} itemTemplate={itemTemplate} header={dataviewHeader}></DataView>
                    <Dialog footer={eventDialogFooter} visible={eventDialog} style={{ width: '450px' }} header="Event details" modal className="p-fluid" onHide={hideDialog}>
                        <div className="field">
                            <label htmlFor="name">Title</label>
                            <InputText id="name" value={event.name} onChange={(e) => onInputChange(e, 'name')} required autoFocus className={classNames({ 'p-invalid': submitted && !event.name })} />
                        </div>
                        <div className="field">
                            <label htmlFor="category">Category</label>
                            <Dropdown id="category" options={categories} value={event.category} onChange={(e) => onInputChange(e, 'category')} optionLabel="name"></Dropdown>
                        </div>
                        <div className="field">
                            <label htmlFor="price">Price</label>
                            <InputNumber id="price" value={event.price} className={classNames({ 'p-invalid': submitted && !event.price })} onChange={(e) => onInputChange(e, 'price')}></InputNumber>
                        </div>
                        <div className="field">
                            <label htmlFor="dateFrom">Date from</label>
                            <Calendar inputId="dateFrom" value={event.dateFrom} onChange={(e) => onInputChange(e, 'dateFrom')}></Calendar>
                        </div>
                        <div className="field">
                            <label htmlFor="dateTo">Date to</label>
                            <Calendar inputId="dateTo" value={event.dateTo} onChange={(e) => onInputChange(e, 'dateTo')}></Calendar>
                        </div>
                        <div className="field">
                            <label htmlFor="dateTo">Image</label>
                            <div style={styles.imgContainer}>
                                {images.map(image => {
                                    const isSelected = event.image === image
                                    return (
                                        <img onClick={() => onInputChange({ value: image }, 'image')} style={isSelected ? styles.imgSelected : styles.img} src={`/api/images/${image}`}/>
                                    )
                                })}
                            </div>
                        </div>
                        <div className="field-checkbox">
                            <Checkbox inputId="isPremium" className="mr-2"  onChange={e => onInputChange(e, 'isPremium')} checked={event.isPremium} />
                            <label htmlFor="isPremium">Is premium</label>
                        </div>
                    </Dialog>
                </div>
            </div>
        </div>
        </>
    )
}

export default ListDemo

const styles = {
    imgContainer: {
        display: 'flex',
        flexDirection: 'row',
        overflowX: 'scroll'
    },
    img: {
        height: 50,
        width: 50,
        borderRadius: 5,
        marginRight: 5,
        cursor: 'pointer',
        border: '3px solid transparent',
        boxSizing: 'border-box'
    },
    imgSelected: {
        height: 50,
        width: 50,
        borderRadius: 5,
        marginRight: 5,
        cursor: 'pointer',
        border: '3px solid orange',
        boxSizing: 'border-box'
    }
}
