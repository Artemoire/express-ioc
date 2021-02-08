declare namespace serloc {

    interface IServiceProvider {
        (resolver: IServiceLocator): any;
    }

    interface IServiceProviderRegistry {
        [key:string]: IServiceProvider;   
    }

    interface IServiceCache {
        [key:string]: any;
    }

    interface IServiceLocator {
        (serviceId: string): any;
    }    
    
}