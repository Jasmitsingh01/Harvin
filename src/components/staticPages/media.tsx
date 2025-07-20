// import React, { useMemo, useState } from 'react';
// import ProgressiveImage from '../../shared/progressive-image';
// import BreadCrumbs from '../../shared/breadcrumbs';
// import { filter } from 'lodash';
// import moment from 'moment';

// const Media = ({ data }: any) => {
//   debugger
//   const [active, setActive] = useState(data?.years[0]);

//   const filterData: any = useMemo(() => {
//     return (
//       filter(data?.printMedia, (media) => media?.publish_date.match(active)) ||
//       []
//     );
//   }, [active]);

//   return (
//     <>
//       <BreadCrumbs />
//       <div className="inner-banner">
//         <div className="container zindex-9 text-white text-center px-md-5">
//           <div className="section-heading text-center">
//             <h2>Media</h2>
//             <p className="text-16 weight-500 mb-0 mt-4 mx-lg-5 px-lg-5">
//               Discover the experiences of our valued customers through their
//               stories of transformation and satisfaction with Harvin furniture.
//               Dive into a world of inspiration and joy.
//             </p>
//           </div>
//         </div>
//       </div>
//       <section className="mt-5 mb-5">
//         <div className="container">
//           <div className="row">
//             <div className="col-md-2 media-left">
//               <ul className="news-nav">
//                 {data?.years?.map((item) => (
//                   <li
//                     key={item}
//                     onClick={() => setActive(item)}
//                     className={`${item === active ? 'active' : ''}`}
//                   >
//                     {item}
//                   </li>
//                 ))}
//               </ul>
//             </div>
//             <div className="col-md-10 media-right mt-4 mt-md-0">
//               <div className="media-listing">
//                 {filterData?.length < 1 ? 'No data found' : ''}
//                 {filterData?.map((media: any) => (
//                   <div key={media.id} className="media-item">
//                     <div className="media-img">
//                       {media?.print_image?.url && (
//                         <ProgressiveImage
//                           src={media.print_image.url}
//                           alt={media.title}
//                           layout="intrinsic"
//                           height={200}
//                           width={200}
//                         />
//                       )}
//                     </div>
//                     <h3 className="text-18 weight-400">{media.title}</h3>
//                     <span className="media-date d-flex">
//                       <i className="fa-solid fa-calendar-days me-2"></i>
//                       <span className="line-height-1">
//                         {moment(media?.publish_date).format('DD/MM/YYYY')}
//                       </span>
//                     </span>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// };

// export default Media;

import React, { useMemo, useState } from 'react';
import ProgressiveImage from '../../shared/progressive-image';
import BreadCrumbs from '../../shared/breadcrumbs';
import { filter } from 'lodash';
import moment from 'moment';

const Media = ({ data }: any) => {
  const [active, setActive] = useState(data?.years[0]);

  const filterData: any = useMemo(() => {
    return (
      filter(data?.printMedia, (media) => media?.publish_date.match(active)) ||
      []
    );
  }, [active]);

  const openInNewTab = (url) => {
    if (!url.startsWith('http') && url) {
      // Add "https://" to URL if it doesn't have it and URL is not empty
      url = 'https://' + url;
    }
    if (url) {
      // Open in new tab only if URL is not empty
      const win = window.open(url, '_blank');
      win.focus();
    }
  };

  return (
    <>
      <BreadCrumbs />
      <div className="inner-banner">
        <div className="container zindex-9 text-white text-center px-md-5">
          <div className="section-heading text-center">
            <h2>Media</h2>
            <p className="text-16 weight-500 mb-0 mt-4 mx-lg-5 px-lg-5">
              Discover the experiences of our valued customers through their
              stories of transformation and satisfaction with Harvin furniture.
              Dive into a world of inspiration and joy.
            </p>
          </div>
        </div>
      </div>
      <section className="mt-5 mb-5">
        <div className="container">
          <div className="row">
            <div className="col-md-2 media-left">
              <ul className="news-nav">
                {data?.years?.map((item) => (
                  <li
                    key={item}
                    onClick={() => setActive(item)}
                    className={`${item === active ? 'active' : ''}`}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-md-10 media-right mt-4 mt-md-0">
              <div className="media-listing">
                {filterData?.length < 1 ? 'No data found' : ''}
                {filterData?.map((media: any) => (
                  <div key={media.id} className="media-item">
                    <div
                      className="media-img"
                      onClick={() => openInNewTab(media.page_link || '')}
                    >
                      {media?.print_image?.url && (
                        <ProgressiveImage
                          src={media.print_image.url}
                          alt={media.title}
                          style={{
                            cursor: media.page_link ? 'pointer' : 'default',
                          }}
                          layout="intrinsic"
                          height={200}
                          width={200}
                        />
                      )}
                    </div>
                    <h3
                      className="text-18 weight-400"
                      style={{
                        cursor: media.page_link ? 'pointer' : 'default',
                      }}
                      onClick={() => openInNewTab(media.page_link || '')}
                    >
                      {media.title}
                    </h3>
                    <span className="media-date d-flex">
                      <i className="fa-solid fa-calendar-days me-2"></i>
                      <span className="line-height-1">
                        {moment(media?.publish_date).format('DD/MM/YYYY')}
                      </span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Media;
