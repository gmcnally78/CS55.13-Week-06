import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../components/layout';
import { getAllPIds, getPData } from '../../lib/pdata';

export async function getStaticProps({ params }) {
  const itemData = await getPData(params.pid);
  // console.log(itemData);
  return {
    props: {
      itemData
    }
  };
}

export async function getStaticPaths() {
  const paths = await getAllPIds();
  return {
    paths,
    fallback: false
  };
}

export default function Entry({ itemData }) {
  return (
    <Layout>
    {/* render details about one entity in persons.json saved in itemData */}
      <article className="card col-6">
      <h2>Person Detail</h2>
        <div className="card-body">
          <h5 className="card-title">{itemData.pdata.name}</h5>
          <h6 className="card-subtitle mb-2 text-muted">{itemData.pdata.phone}</h6>
          <p className="card-text">{itemData.pdata.birthdate}</p>
          <a href={'mailto:' + itemData.pdata.email} className="card-link">{itemData.pdata.email}</a>
        </div>
      </article>
      {/* render details about all other entities in persons.json related to id */}
      <div className="list-group col-6">
      {/* check for existence of itemData.related property */}
      {itemData.pdata.related ? 
      <h2>Related Persons</h2> : null
      }
      {itemData.pdata.related ?
        itemData.pdata.related.map (
          ({ id, name }) => (
            <Link key={id} href={`${id}`}>
            <a className="list-group-item list-group-action">{name}</a>
            </Link>
          )
         )
         : null
         }
        {/* using expression ? ... : null */}
      </div>
    </Layout>
  );
}