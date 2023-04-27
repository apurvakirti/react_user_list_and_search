import './index.scss';

export default function Loader() {
  return (
    <div className='wrapper'>
      <div className='loader-wrapper' data-testid='loader-wrapper'>
        <div className='loader-circle' />
      </div>
    </div>
  );
}
