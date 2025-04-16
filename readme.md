[![Built With Stencil](https://img.shields.io/badge/-Built%20With%20Stencil-16161d.svg?logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjIuMSwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI%2BCjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI%2BCgkuc3Qwe2ZpbGw6I0ZGRkZGRjt9Cjwvc3R5bGU%2BCjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00MjQuNywzNzMuOWMwLDM3LjYtNTUuMSw2OC42LTkyLjcsNjguNkgxODAuNGMtMzcuOSwwLTkyLjctMzAuNy05Mi43LTY4LjZ2LTMuNmgzMzYuOVYzNzMuOXoiLz4KPHBhdGggY2xhc3M9InN0MCIgZD0iTTQyNC43LDI5Mi4xSDE4MC40Yy0zNy42LDAtOTIuNy0zMS05Mi43LTY4LjZ2LTMuNkgzMzJjMzcuNiwwLDkyLjcsMzEsOTIuNyw2OC42VjI5Mi4xeiIvPgo8cGF0aCBjbGFzcz0ic3QwIiBkPSJNNDI0LjcsMTQxLjdIODcuN3YtMy42YzAtMzcuNiw1NC44LTY4LjYsOTIuNy02OC42SDMzMmMzNy45LDAsOTIuNywzMC43LDkyLjcsNjguNlYxNDEuN3oiLz4KPC9zdmc%2BCg%3D%3D&colorA=16161d&style=flat-square)](https://stenciljs.com)

<br />
<div align="center">
  <a href="https://kort.xyz">
    <img src="https://avatars.githubusercontent.com/u/34128814?s=400&u=1c88fc45c4b68be2855b3e3bcb3425102f3fe7f1&v=4" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">KORTxyz - Components</h3>


  <p align="center">
    A collection of webcomponents mainly for geospatial webapps.
    <br />
    <a href="https://github.com/kortxyz/kortxyz-components"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://demo.kort.xyz">View Demo</a>
    ·
    <a href="https://github.com/kortxyz/kortxyz-components/issues">Report Bug</a>
    ·
    <a href="https://github.com/kortxyz/kortxyz-components/issues">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
        <li><a href="#usage">Usage</a></li>
      </ul>
    </li>
    <li>
      <a href="#usage">Usage examples</a>
      <ul>
        <li><a href="#kortxyz-maplibre (map)">kortxyz-maplibre (map)</a></li>
        <li><a href="#kortxyz-aggrid (table)">kortxyz-aggrid (table)</a></li>
      </ul>
    </li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project
Plug and play webcomponents for making a webapp. 


![Product Name Screen Shot](https://raw.githubusercontent.com/KORTxyz/kortxyz-components/master/.readme/screenshot.png)



<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- GETTING STARTED -->
## Getting Started

To use the components your can either use them directly or install them from npm:

### Prerequisites

* Add the HTML tags to your website
  ```html
    <script type="module" src="https://cdn.kort.xyz/kortxyz-components%40latest//kortxyz-components.esm.js"></script>
    <link rel="stylesheet" href="https://cdn.kort.xyz/kortxyz-components%40latest//kortxyz-components.css" />
  ```
### Installation

1. Install the plugin through npm
   ```sh
   npm i @kortxyz/kortxyz-components
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

### kortxyz-maplibre (map) [readme](https://github.com/KORTxyz/kortxyz-components/tree/main/src/components/kortxyz-maplibre)
  ```html
  <kortxyz-maplibre 
      style="width:100%;height: 200px;display:block"
      mapstyle='https://demotiles.maplibre.org/style.json'
  ></kortxyz-maplibre>
  ```

### kortxyz-aggrid (table) [readme](https://github.com/KORTxyz/kortxyz-components/tree/main/src/components/kortxyz-aggrid)
  ```html
  <kortxyz-aggrid 
      data="https://api.dataforsyningen.dk/afstemningsomraader?kommunekode=183&&format=geojson"
  ></kortxyz-aggrid>
  ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ROADMAP -->
## Roadmap

- [x] Map (Maplibre)
  - [x] Standalone Source/Layer
  - [x] Searchbar
  - [] Legend
- [x] Table (Aggrid)
- [x] Datastore
- [] Charts  
- [] Mapbox styleeditor
- [] QR-code 

See the [open issues](https://github.com/kortxyz/kortxyz-components/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!


<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

KORTxyz [info@kort.xyz](mailto:info@kort.xyz)

Project Link: [https://github.com/kortxyz/kortxyz-components](https://github.com/kortxyz/kortxyz-components)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

* []()
* []()
* []()

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/kortxyz/ogcapi-gpkg.svg?style=for-the-badge
[contributors-url]: https://github.com/kortxyz/ogcapi-gpkg/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/kortxyz/ogcapi-gpkg.svg?style=for-the-badge
[forks-url]: https://github.com/kortxyz/ogcapi-gpkg/network/members
[stars-shield]: https://img.shields.io/github/stars/kortxyz/ogcapi-gpkg.svg?style=for-the-badge
[stars-url]: https://github.com/kortxyz/ogcapi-gpkg/stargazers
[issues-shield]: https://img.shields.io/github/issues/kortxyz/ogcapi-gpkg.svg?style=for-the-badge
[issues-url]: https://github.com/kortxyz/ogcapi-gpkg/issues
[license-shield]: https://img.shields.io/github/license/kortxyz/ogcapi-gpkg.svg?style=for-the-badge
[license-url]: https://github.com/kortxyz/ogcapi-gpkg/blob/master/LICENSE.txt