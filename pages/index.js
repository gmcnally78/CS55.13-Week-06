import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/layout';
import { getSortedPList } from '../lib/pdata';
import { getSortedCList } from '../lib/cdata';

export async function getStaticProps() {
  const allPData = await getSortedPList();
  const allCData = await getSortedCList();
  return {
    props: {
      allPData, allCData
    }
  }
}

export default function Home({ allPData, allCData }) {
  // console.log(allCData);
  return (
      <Layout home>
       <h1>List of Names</h1>
        <div className="list-group">
          {allPData ?
            allPData.map(({ params }) => (
            <Link key={params.pid} href={`/persons/${params.pid}`}>
              <a className="list-group-item list-group-item-action">{params.pdata}</a>
            </Link>
          ))
          : null }
        </div>
        <br/>
          <h1>List of Cars</h1>
         <div className="list-group">
           {allCData ?
          allCData.map(({ params }) => (
            <Link key={params.cid} href={`/cars/${params.cid}`}>
              <a className="list-group-item list-group-item-action">{params.make}</a>
            </Link>
          ))
          : null }
        </div>
      </Layout>

  );
}

