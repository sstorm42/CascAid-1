import React from 'react';
import { Table, Button } from 'react-bootstrap';
import moment from 'moment';
import { EditButtonRender, DeleteButtonRender } from '../../components/form_template/buttons-render';
const SampleNews = (props) => {
    const news = [
        {
            id: 0,
            isActive: false,
            picture: 'http://placehold.it/32x32',
            title: 'Cupidatat commodo dolore ex laborum consectetur.',
            description:
                'Magna magna culpa ut non exercitation. Aliqua dolor fugiat duis voluptate non Lorem. Veniam dolore tempor cillum laborum veniam est. Id et magna id nisi qui sit deserunt sunt.\r\n',
            createdAt: '2015-01-16T01:56:58-06:00',
            type: 'volunteering',
        },
        {
            id: 1,
            isActive: false,
            picture: 'http://placehold.it/32x32',
            title: 'Ullamco elit sunt pariatur cillum cillum amet cillum non enim laboris consequat qui in.',
            description:
                'Reprehenderit in nostrud ea dolor ad veniam consectetur duis veniam minim ipsum aute aliqua. Commodo sint pariatur elit eu tempor consectetur nisi non dolor. Ea ad est ullamco ea cillum nulla enim. Reprehenderit adipisicing mollit exercitation elit anim et consectetur esse voluptate. Eiusmod do voluptate do culpa pariatur pariatur culpa ipsum do aliquip laborum anim ipsum ipsum.\r\n',
            createdAt: '2015-04-24T06:11:52-06:00',
            type: 'volunteering',
        },
        {
            id: 2,
            isActive: true,
            picture: 'http://placehold.it/32x32',
            title: 'Aute quis excepteur mollit ullamco aliquip Lorem.',
            description:
                'Incididunt nisi enim incididunt nostrud officia proident occaecat. Incididunt culpa voluptate laboris irure aliquip fugiat. Ut cillum occaecat ex enim irure sit Lorem nisi aliqua aliqua non non ad. Sint officia exercitation proident nostrud officia. Veniam laborum sunt exercitation adipisicing magna sit. Ullamco veniam cupidatat voluptate veniam reprehenderit dolor anim deserunt sit dolor. Enim commodo nisi qui sunt voluptate nisi magna.\r\n',
            createdAt: '2014-03-26T04:48:25-06:00',
            type: 'advocacy',
        },
        {
            id: 3,
            isActive: true,
            picture: 'http://placehold.it/32x32',
            title: 'Minim irure ipsum nisi nostrud duis excepteur nisi.',
            description:
                'Aute tempor cupidatat laboris amet duis voluptate laborum. Et consectetur nulla elit commodo excepteur magna eiusmod cillum excepteur sint magna ex do nulla. Tempor quis officia occaecat commodo voluptate dolore commodo. Id nulla aliquip quis et laborum nisi laboris sint mollit nulla.\r\n',
            createdAt: '2020-01-22T06:58:06-06:00',
            type: 'event',
        },
        {
            id: 4,
            isActive: false,
            picture: 'http://placehold.it/32x32',
            title: 'Nisi consequat do labore minim fugiat elit aliqua labore magna ea.',
            description:
                'Enim duis deserunt nulla anim sunt. Minim ullamco eiusmod sit officia officia dolore incididunt. Incididunt magna enim ullamco nulla exercitation aliqua tempor. Veniam magna aute nostrud proident dolore consectetur mollit dolore. Voluptate ut reprehenderit labore ex excepteur velit culpa consectetur mollit do anim fugiat magna duis. Ad ipsum voluptate velit nulla cillum dolor eiusmod incididunt Lorem. Excepteur in fugiat esse aliquip dolor reprehenderit.\r\n',
            createdAt: '2015-03-29T07:33:23-06:00',
            type: 'advocacy',
        },
        {
            id: 5,
            isActive: true,
            picture: 'http://placehold.it/32x32',
            title: 'Commodo commodo incididunt ea culpa esse culpa non aliquip.',
            description:
                'Ut qui aute duis ea ad nulla pariatur nostrud labore fugiat. Laboris ea incididunt aliquip nulla enim. Fugiat ex irure laborum deserunt. Ea velit laboris esse veniam occaecat dolore do esse reprehenderit non sunt occaecat ad. Veniam adipisicing anim in non proident sunt magna nisi deserunt consequat laboris.\r\n',
            createdAt: '2017-04-28T06:31:30-06:00',
            type: 'project',
        },
        {
            id: 6,
            isActive: true,
            picture: 'http://placehold.it/32x32',
            title: 'Sit cupidatat deserunt deserunt id excepteur irure commodo mollit amet.',
            description:
                'Nisi est ex occaecat sint aliquip. Laborum ea consectetur est adipisicing id fugiat commodo labore ex tempor minim. Eiusmod laboris consequat culpa ea pariatur dolore ipsum cillum exercitation ut non exercitation aliqua.\r\n',
            createdAt: '2016-01-25T12:25:37-06:00',
            type: 'project',
        },
    ];
    return (
        <Table striped bordered hover size="sm">
            <thead>
                <tr>
                    <th></th>
                    <th>
                        <input type="text" className="form-control" />
                    </th>
                    <th>
                        <input type="text" className="form-control" />
                    </th>
                    <th colSpan={2}></th>
                </tr>
            </thead>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Type</th>
                    <th>Title</th>
                    <th>Created At</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {news.map((ns, i) => {
                    return (
                        <tr key={i}>
                            <td>{i + 1}</td>
                            <td>{ns.type}</td>
                            <td>{ns.title}</td>

                            <td>{moment(ns.createdAt).format('LLL')}</td>
                            <td>
                                <EditButtonRender /> &nbsp;
                                <DeleteButtonRender />
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </Table>
    );
};
export default SampleNews;
