declare namespace vendor {
    interface IVendor {
        name: string;
    }

    interface IMovie {
        title: string;
        duration: number;
        rank: number;
    }

    interface IMoviesEndpoint {
        async all(): IMovie[];
    }
}
