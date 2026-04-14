export default async function handler(req, res) {

    const API_KEY = process.env.AIzaSyAddklpEu130UxAAIKnQQ3fea6INy5smZ0;
    const link = req.query.link;

    const match = link.match(/folders\/(.*)/);
    if (!match) return res.json({ error: "Link sai" });

    const folderId = match[1];

    let files = [];
    let pageToken = "";

    do {
        const url = `https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents+and+mimeType+contains+'image/'&fields=nextPageToken,files(id,name)&key=${API_KEY}&pageToken=${pageToken}`;

        const r = await fetch(url);
        const data = await r.json();

        files = files.concat(data.files || []);
        pageToken = data.nextPageToken;

    } while (pageToken);

    res.json(files);
}