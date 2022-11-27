const VideoModel = require('../model/video');

//Hàm chuyển đổi date từ string sang object
const splitDate = (date) => {
    // console.log("date:", date);
    date = date.substr(0, 10);

    const result = {
        day: parseInt(date.split("-")[2]),
        month: parseInt(date.split("-")[1]),
        year: parseInt(date.split("-")[0]),
    };

    return result; 
};

//Hàm tìm trailer mới nhất
const findLatestTrailer = (list) => {

    let latestTrailer = list[0];
    // so sánh ngày-tháng-năm từng cặp date
    list.forEach((video) => {
        const dateA = splitDate(latestTrailer.published_at);
        const dateB = splitDate(video.published_at);
        // so sánh năm
        if (dateA.year > dateB.year) {
            latestTrailer = latestTrailer;
        } else if (dateA.year < dateB.year) {
            latestTrailer = video;
        } else {
            // so sánh tháng
            if (dateA.month > dateB.month) {
                latestTrailer = latestTrailer;
            } else if (dateA.month < dateB.month) {
                latestTrailer = video;
            } else {
                // so sánh ngày
                if (dateA.day > dateB.day) {
                    latestTrailer = latestTrailer;
                } else {
                    latestTrailer = video;
                }
            }
        }
    });

    return latestTrailer;
};


exports.postTrailer = (request, response) => {
    
    const movieID = request.body.id;
 
    if (!movieID) {
        console.log("Not found id:", movieID);
        response.statusMessage = `Not found film id param`;
        response.status(400).end();
    }

    VideoModel.fetchAll((videos) => {
        // lọc trailer theo request id
        const movieTrailer = videos.find((video) => video.id === movieID);

        if (movieTrailer != undefined) {
            // 2 điều kiện là youtube và type là trailer 
            const officialYoutubes = movieTrailer.videos.filter(
                (video) => video.official == true && video.site === "YouTube"
            );
            let trailer = officialYoutubes.filter(
                (video) => video.type === "Trailer"
            );

            // lọc teaser nếu phim không có trailer
            if (trailer.length == 0) {
                trailer = officialYoutubes.filter((video) => video.type === "Teaser");
            }

            //có kết quả thoả các điều kiện trên 
            if (trailer.length === 1) {
                trailer = trailer[0];
                response.send(trailer);
            } else {
                // tìm trailer mới nhất nếu có nhiều hơn 1 
                trailer = findLatestTrailer(trailer);
                response.send(trailer);
            }
        } else {
            console.log(`Not found trailer id:${movieID}`);
            response.statusMessage = `Not found trailer video for id:${movieID}`;
            response.status(404).end();
        }
    });
};