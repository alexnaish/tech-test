import axios from 'axios';

function fetchFromService(serviceName, data) {
  const serviceMap = {
    'config': 'http://config-service.com',
    'status': 'http://status-service.com',
    'user': 'http://user-service.com',
  }

  fetch(serviceMap[serviceName], data);
}

document.addEventListener('DOMContentLoaded', function () {
  
  const configResult = fetchFromService('config')
    .then(config => {
      fetchFromService('user', config)
        .then(userRes => {
          user = userRes;

          user.groups.forEach(group => {

            var groupDiv = document.createElement('div');
            groupDiv.appendChild(document.createTextNode(group.name));
            
            axios.get('http://group-service.com/'+ group.name+'/info')
              .then(groupInfo => {
                groupDiv.appendChild(document.createTextNode(groupInfo.description));
              });
            document.appendChild(groupDiv);

          })

          fetchFromService('status')
            .then(status => {
              var div = document.createElement('div');
              div.appendChild('Status: ');
              div.appendChild(document.createTextNode(group.name));
              document.appendChild(div);
            });

        })
      return config;
    });

}, false);
