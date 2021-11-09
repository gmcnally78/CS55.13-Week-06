import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../components/layout';
import { getAllCIds, getCData } from '../../lib/cdata';

export async function getStaticProps({ params }) {
  const itemData = await getCData(params.cid);
  // console.log(itemData);
  return {
    props: {
      itemData
    }
  };
}

export async function getStaticPaths() {
  const paths = await getAllCIds();
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
        <div className="card-body">
          <h5 className="card-title">{itemData.data.make}</h5>
          <h6 className="card-subtitle mb-2 text-muted">{itemData.data.model}</h6>
          <p className="card-text">{itemData.data.year}</p>
          <p className="card-text">{itemData.data.color}</p>
        </div>
      </article>
      {/* render details about all other entities in persons.json related to id */}
      <div className="list-group col-6">
      {/* check for existence of itemData.related property */}
      {itemData.related ? 
      <h2>Longest Lasting Most Durable Car</h2> : null
      }
      {itemData.related ?
        itemData.related.map (
          ({ id, make }) => (
            <Link key={id} href={`${id}`}>
            <a className="list-group-item list-group-action">{make}</a>
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