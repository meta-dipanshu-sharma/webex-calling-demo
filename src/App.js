import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Header from './HeaderContent';
import Footer from './FooterContent';
import CallingWidget from './CallingWidget';
import PatientList from './PatientList';
import HospitalStaff from './HospitalStaff';

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <div class="position-relative overflow-hidden text-center bg-light">
          <div class="col-md-5 mx-auto my-5">
            <h1 class="display-4 fw-normal">Doctor's Home Dashboard</h1>
          </div>
        </div>

        <div class="d-md-flex w-100 my-md-3 ps-md-3 flex-md-equal">
          <div class="row">
            <div class="col-lg-7">
              <div class="row">
                <div class="col">
                  <HospitalStaff />
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <PatientList />
                </div>
              </div>
            </div>
            <div class="col-lg-5 h-100">
              <div class="row h-100">
                <div class="col h-100">
                  <CallingWidget />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
