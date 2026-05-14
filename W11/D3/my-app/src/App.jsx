import './App.css'
import {ManagingApiState} from "./components/P1";
import { UseEffectLifeCycle } from './components/P2';
import { AxiosLifecycle } from './components/P3';
import { CRUDOperations } from './components/P4';
import { PaginationCaching } from './components/P5';
import { UploadErrorBoundary } from './components/P6';
function App() {

  return (
    <>
      {/* <ManagingApiState /> */}
      {/* <UseEffectLifeCycle /> */}
      {/* <AxiosLifecycle/> */}
      {/* <CRUDOperations /> */}
      {/* <PaginationCaching/> */}
      <UploadErrorBoundary />
    </>
  )
}

export default App
