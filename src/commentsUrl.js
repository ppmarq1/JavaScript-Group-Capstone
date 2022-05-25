export default class commentsUrl {
    static counterComments = (data) => {
        let count = 0;
        for (let i = 0; i < data.length; i += 1) {
          count += 1;
        }
        return count;
    };
}